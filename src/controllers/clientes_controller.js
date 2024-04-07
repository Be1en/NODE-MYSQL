function leer_clientes(req,res){

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM clientes", (err, clientes) => {
            if (err) {
                res.json(err);
            }
            res.render('tasks/ver_clientes', { clientes });
        });
    });
}

function crear_clientes(req,res){
    res.render('tasks/crear_clientes');
}

function store(req, res) {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al conectar a la base de datos'); // Maneja el error de conexión
        }
        conn.query('INSERT INTO clientes SET ?', [data], (err, rows) => { 
            if (err) {
                console.log(err);
                return res.status(500).send('Error al insertar datos en la base de datos'); // Maneja el error de consulta
            }
            res.redirect('/clientes');
        });
    });
}

function destroy(req, res){
    const id = req.body.id;
    req.getConnection((err, conn) => {
        conn.query("DELETE FROM clientes WHERE id = ?", [id] ,(err, clientes) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/clientes');
        });
    });
}

function edit(req, res){
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM clientes WHERE id =?", [id], (err, clientes) => {
            if (err) {
                res.json(err);
            }
            res.render('tasks/editar_clientes', { clientes });
        });
    });
}


function update(req, res){
    const id = req.params.id;
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al conectar a la base de datos'); // Maneja el error de conexión
        }
        conn.query('UPDATE clientes SET ? WHERE id = ?', [data, id], (err, rows) => { 
            if (err) {
                console.log(err);
                return res.status(500).send('Error al actualizar datos en la base de datos'); // Maneja el error de consulta
            }
            res.redirect('/clientes');
        });
    });
}

module.exports = {
    leer_clientes: leer_clientes,
    crear_clientes: crear_clientes,
    store: store,
    destroy: destroy,
    edit:edit,
    update:update
}