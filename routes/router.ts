
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../classes/grafica';
import { Encuesta } from '../classes/encusta';

const router = Router();

const grafica = new GraficaData();

const encuesta = new Encuesta();

router.get('/grafica', ( req: Request, res: Response  ) => {

    res.json(grafica.getDataGrafica());

});

router.post('/grafica', ( req: Request, res: Response  ) => {

    const mes = req.body.mes;
    const valor     = Number(req.body.valor);

    grafica.ingrementarValor(mes, valor);



    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica() );


    res.json(grafica.getDataGrafica());

});


router.get('/encuesta', ( req: Request, res: Response  ) => {

    res.json(encuesta.getDatos());

});

router.post('/encuesta', ( req: Request, res: Response  ) => {

    const opcion = Number(req.body.opcion);
    const valor     = Number(req.body.valor);

    encuesta.ingrementar(opcion,valor);



    const server = Server.instance;
    server.io.emit('cambio-encuesta', encuesta.getDatos());


    res.json(encuesta.getDatos());

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const payload = {
        de,
        cuerpo
    }


    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );


    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (  req: Request, res: Response ) => {

    const server = Server.instance;

    server.io.clients( ( err: any, clientes: string[] ) => {

        if ( err ) {
            return res.json({
                ok: false,
                err
            })
        }


        res.json({
            ok: true,
            clientes
        });


    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (  req: Request, res: Response ) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

    
});




export default router;


