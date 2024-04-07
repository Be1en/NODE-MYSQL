function leer_productos(req,res){

      req.getConnection((err, conn) => {
        conn.query("SELECT * FROM productos", (err, productos) => {
            if (err) {
                res.json(err);
            }
            res.render('tasks/ver_productos', { productos });
        });
    });
}

function crear_productos(req,res){
    res.render('tasks/crear_productos');
}


function store(req, res) {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al conectar a la base de datos'); // Maneja el error de conexión
        }
        conn.query('INSERT INTO productos SET ?', [data], (err, rows) => { 
            if (err) {
                console.log(err);
                return res.status(500).send('Error al insertar datos en la base de datos'); // Maneja el error de consulta
            }
            res.redirect('/productos');
        });
    });
}

function destroy(req, res){
    const id = req.body.id;
    req.getConnection((err, conn) => {
        conn.query("DELETE FROM productos WHERE id = ?", [id] ,(err, productos) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/productos');
        });
    });
}

function edit(req, res){
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM productos WHERE id =?", [id], (err, productos) => {
            if (err) {
                res.json(err);
            }
            res.render('tasks/editar_productos', { productos });
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
        conn.query('UPDATE productos SET ? WHERE id = ?', [data, id], (err, rows) => { 
            if (err) {
                console.log(err);
                return res.status(500).send('Error al actualizar datos en la base de datos'); // Maneja el error de consulta
            }
            res.redirect('/productos');
        });
    });
}


module.exports = {
    leer_productos: leer_productos,
    crear_productos: crear_productos,
    store: store,
    destroy: destroy,
    edit:edit,
    update:update
}