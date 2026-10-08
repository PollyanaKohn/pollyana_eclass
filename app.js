require('dotenv').config();

const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ======================================================
// ROTA INICIAL
// ======================================================

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'Bem vindo à API GamerClass',
        status: 'sucesso',
        rotas: [
            '/api/jogos',
            '/api/times',
            '/api/competidores',
            '/api/confrontos'
        ]
    });
});

// ======================================================
// JOGOS
// ======================================================

// GET todos
app.get('/api/jogos', async (req, res) => {
    const { data, error } = await supabase
        .from('jogos')
        .select('*')
        .order('id');

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    res.json(data);
});

// GET por ID
app.get('/api/jogos/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('jogos')
        .select('*')
        .eq('id', req.params.id)
        .single();

    if (error || !data) {
        return res.status(404).json({
            erro: 'Jogo não encontrado'
        });
    }

    res.json(data);
});

// POST
app.post('/api/jogos', async (req, res) => {
    const { name, genre } = req.body;

    if (!name || !genre) {
        return res.status(400).json({
            erro: 'Nome e gênero são obrigatórios'
        });
    }

    const { data, error } = await supabase
        .from('jogos')
        .insert({
            name,
            genre
        })
        .select()
        .single();

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    res.status(201).json(data);
});

// PUT
app.put('/api/jogos/:id', async (req, res) => {
    const { name, genre } = req.body;

    const { data, error } = await supabase
        .from('jogos')
        .update({
            name,
            genre
        })
        .eq('id', req.params.id)
        .select()
        .single();

    if (error || !data) {
        return res.status(404).json({
            erro: 'Jogo não encontrado'
        });
    }

    res.json(data);
});

// DELETE
app.delete('/api/jogos/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('jogos')
        .delete()
        .eq('id', req.params.id)
        .select();

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({
            erro: 'Jogo não encontrado'
        });
    }

    res.status(204).send();
});

// ======================================================
// TIMES
// ======================================================

// GET todos
app.get('/api/times', async (req, res) => {
    const { data, error } = await supabase
        .from('times')
        .select('*')
        .order('id');

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    res.json(data);
});

// GET por ID
app.get('/api/times/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('times')
        .select('*')
        .eq('id', req.params.id)
        .single();

    if (error || !data) {
        return res.status(404).json({
            erro: 'Time não encontrado'
        });
    }

    res.json(data);
});

// POST
app.post('/api/times', async (req, res) => {
    const { name, color } = req.body;

    if (!name || !color) {
        return res.status(400).json({
            erro: 'Nome e cor são obrigatórios'
        });
    }

    const { data, error } = await supabase
        .from('times')
        .insert({
            name,
            color
        })
        .select()
        .single();

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    res.status(201).json(data);
});

// PUT
app.put('/api/times/:id', async (req, res) => {
    const { name, color } = req.body;

    const { data, error } = await supabase
        .from('times')
        .update({
            name,
            color
        })
        .eq('id', req.params.id)
        .select()
        .single();

    if (error || !data) {
        return res.status(404).json({
            erro: 'Time não encontrado'
        });
    }

    res.json(data);
});

// DELETE
app.delete('/api/times/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('times')
        .delete()
        .eq('id', req.params.id)
        .select();

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({
            erro: 'Time não encontrado'
        });
    }

    res.status(204).send();
});

// ======================================================
// COMPETIDORES
// ======================================================

// GET todos
app.get('/api/competidores', async (req, res) => {
    const { data, error } = await supabase
        .from('competidores')
        .select('*')
        .order('id');

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    const resultado = data.map(c => ({
        id: c.id,
        name: c.name,
        nickname: c.nickname,
        teamId: c.team_id
    }));

    res.json(resultado);
});

// GET por ID
app.get('/api/competidores/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('competidores')
        .select('*')
        .eq('id', req.params.id)
        .single();

    if (error || !data) {
        return res.status(404).json({
            erro: 'Competidor não encontrado'
        });
    }

    res.json({
        id: data.id,
        name: data.name,
        nickname: data.nickname,
        teamId: data.team_id
    });
});

// POST
app.post('/api/competidores', async (req, res) => {
    const { name, nickname, teamId } = req.body;

    if (!name || !nickname || !teamId) {
        return res.status(400).json({
            erro: 'Nome, nickname e time são obrigatórios'
        });
    }

    const { data, error } = await supabase
        .from('competidores')
        .insert({
            name,
            nickname,
            team_id: Number(teamId)
        })
        .select()
        .single();

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    res.status(201).json({
        id: data.id,
        name: data.name,
        nickname: data.nickname,
        teamId: data.team_id
    });
});

// PUT
app.put('/api/competidores/:id', async (req, res) => {
    const { name, nickname, teamId } = req.body;

    const { data, error } = await supabase
        .from('competidores')
        .update({
            name,
            nickname,
            team_id: Number(teamId)
        })
        .eq('id', req.params.id)
        .select()
        .single();

    if (error || !data) {
        return res.status(404).json({
            erro: 'Competidor não encontrado'
        });
    }

    res.json({
        id: data.id,
        name: data.name,
        nickname: data.nickname,
        teamId: data.team_id
    });
});

// DELETE
app.delete('/api/competidores/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('competidores')
        .delete()
        .eq('id', req.params.id)
        .select();

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({
            erro: 'Competidor não encontrado'
        });
    }

    res.status(204).send();
});

// ======================================================
// CONFRONTOS
// ======================================================

// GET todos
app.get('/api/confrontos', async (req, res) => {
    const { data, error } = await supabase
        .from('confrontos')
        .select('*')
        .order('id');

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    const resultado = data.map(c => ({
        id: c.id,
        gameId: c.game_id,
        team1Id: c.team1_id,
        team2Id: c.team2_id,
        score1: c.score1,
        score2: c.score2,
        status: c.status,
        date: c.date
    }));

    res.json(resultado);
});

// GET por ID
app.get('/api/confrontos/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('confrontos')
        .select('*')
        .eq('id', req.params.id)
        .single();

    if (error || !data) {
        return res.status(404).json({
            erro: 'Confronto não encontrado'
        });
    }

    res.json({
        id: data.id,
        gameId: data.game_id,
        team1Id: data.team1_id,
        team2Id: data.team2_id,
        score1: data.score1,
        score2: data.score2,
        status: data.status,
        date: data.date
    });
});

// POST
app.post('/api/confrontos', async (req, res) => {
    const {
        gameId,
        team1Id,
        team2Id,
        score1 = 0,
        score2 = 0,
        status = 'scheduled',
        date
    } = req.body;

    if (!gameId || !team1Id || !team2Id || !date) {
        return res.status(400).json({
            erro: 'Jogo, times e data são obrigatórios'
        });
    }

    const { data, error } = await supabase
        .from('confrontos')
        .insert({
            game_id: Number(gameId),
            team1_id: Number(team1Id),
            team2_id: Number(team2Id),
            score1: Number(score1),
            score2: Number(score2),
            status,
            date
        })
        .select()
        .single();

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    res.status(201).json({
        id: data.id,
        gameId: data.game_id,
        team1Id: data.team1_id,
        team2Id: data.team2_id,
        score1: data.score1,
        score2: data.score2,
        status: data.status,
        date: data.date
    });
});

// PUT
app.put('/api/confrontos/:id', async (req, res) => {
    const {
        gameId,
        team1Id,
        team2Id,
        score1,
        score2,
        status,
        date
    } = req.body;

    const atualizacao = {};

    if (gameId !== undefined) atualizacao.game_id = Number(gameId);
    if (team1Id !== undefined) atualizacao.team1_id = Number(team1Id);
    if (team2Id !== undefined) atualizacao.team2_id = Number(team2Id);
    if (score1 !== undefined) atualizacao.score1 = Number(score1);
    if (score2 !== undefined) atualizacao.score2 = Number(score2);
    if (status !== undefined) atualizacao.status = status;
    if (date !== undefined) atualizacao.date = date;

    const { data, error } = await supabase
        .from('confrontos')
        .update(atualizacao)
        .eq('id', req.params.id)
        .select()
        .single();

    if (error || !data) {
        return res.status(404).json({
            erro: 'Confronto não encontrado'
        });
    }

    res.json({
        id: data.id,
        gameId: data.game_id,
        team1Id: data.team1_id,
        team2Id: data.team2_id,
        score1: data.score1,
        score2: data.score2,
        status: data.status,
        date: data.date
    });
});

// DELETE
app.delete('/api/confrontos/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('confrontos')
        .delete()
        .eq('id', req.params.id)
        .select();

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({
            erro: 'Confronto não encontrado'
        });
    }

    res.status(204).send();
});

// ======================================================
// ROTA NÃO ENCONTRADA
// ======================================================

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada'
    });
});

// ======================================================
// SERVIDOR
// ======================================================

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});