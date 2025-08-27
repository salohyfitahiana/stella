from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'tokonySoloinaAminTenyMiafina'  # Mila soloina raha tena production

DB_PATH = 'game.db'

# --------- Init DB ---------
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            score1_1 INTEGER DEFAULT 0,
            score1_2 INTEGER DEFAULT 0,
            score1_3 INTEGER DEFAULT 0,
            score2_1 INTEGER DEFAULT 0,
            score2_2 INTEGER DEFAULT 0,
            score2_3 INTEGER DEFAULT 0,
            score3_1 INTEGER DEFAULT 0,
            score3_2 INTEGER DEFAULT 0,
            score3_3 INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

# --------- Routes HTML ---------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/section1')
def section1():
    return render_template('section1.html')

@app.route('/section2')
def section2():
    return render_template('section2.html')

@app.route('/section3')
def section3():
    return render_template('section3.html')

@app.route('/section')
def section_home():
    return render_template('section.html')

# --------- API: Valider ou créer joueur ---------
@app.route('/submit_name', methods=['POST'])
def submit_name():
    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({'error': 'Aucun nom fourni'}), 400

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT * FROM players WHERE name = ?', (name,))
    player = c.fetchone()

    if player:
        player_id = player[0]
        # Rehefa mpilalao efa misy dia mitahiry session
        session['player_id'] = player_id
        session['player_name'] = name
        scores = {
            'score1_1': player[2],
            'score1_2': player[3],
            'score1_3': player[4],
            'score2_1': player[5],
            'score2_2': player[6],
            'score2_3': player[7],
            'score3_1': player[8],
            'score3_2': player[9],
            'score3_3': player[10]
        }
    else:
        c.execute('INSERT INTO players (name) VALUES (?)', (name,))
        conn.commit()
        player_id = c.lastrowid
        session['player_id'] = player_id
        session['player_name'] = name
        scores = {f'score{i}_{j}': 0 for i in range(1, 4) for j in range(1, 4)}

    conn.close()
    return jsonify({
        'id': player_id,
        'name': name,
        'scores': scores
    })

# --------- API: Mise à jour score ---------
@app.route('/update_score', methods=['POST'])
def update_score():
    data = request.get_json()
    player_id = data.get('id')
    section = data.get('section')
    niveau = data.get('niveau')
    score = data.get('score')

    if not player_id or not section or not niveau or score is None:
        return jsonify({'error': 'Données incomplètes'}), 400

    field = f'score{section}_{niveau}'

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(f'''
        UPDATE players
        SET {field} = CASE WHEN {field} < ? THEN ? ELSE {field} END
        WHERE id = ?
    ''', (score, score, player_id))
    conn.commit()
    conn.close()

    return jsonify({'success': True})

# --------- Admin View: Liste complète des joueurs ---------
@app.route('/admin/players')
def admin_players():
    # Mety asiana mot de passe kely raha tiana
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT * FROM players ORDER BY id ASC')
    players = c.fetchall()
    conn.close()
    return render_template('players_admin.html', players=players)

# --------- Joueur View: Info de lui irery ---------
@app.route('/me')
def player_info():
    player_id = session.get('player_id')
    if not player_id:
        return redirect(url_for('index'))

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT * FROM players WHERE id = ?', (player_id,))
    player = c.fetchone()
    conn.close()

    return render_template('player_info.html', player=player)

# --------- Main ---------
if __name__ == '__main__':
    init_db()
    app.run(debug=True)
    app.run(host="0.0.0.0", port=5000)
