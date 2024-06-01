<?php

use App\Http\Controllers\CommonArea\CommonAreaController;
use App\Http\Controllers\CommonArea\EquipmentController;
use App\Http\Controllers\CommonArea\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Departamento\BloqueController;
use App\Http\Controllers\Departamento\DepartamentoCotroller;
use App\Http\Controllers\Departamento\EdificioController;
use App\Http\Controllers\Departamento\ResidenteController;
use App\Http\Controllers\Departamento\ContratoController;
use App\Http\Controllers\Departamento\VisitaController;
use App\Http\Controllers\Departamento\ParqueoController;

use App\Http\Controllers\Empleados\EmployeeController;
use App\Http\Controllers\Empleados\ContractController;
use App\Http\Controllers\Empleados\AreaController;
use App\Http\Controllers\Empleados\BenefitController;
use App\Http\Controllers\Empleados\PositionController;
use App\Http\Controllers\Empleados\AtrasoController;

use App\Http\Controllers\Notificaciones\PersonaController;
use App\Http\Controllers\Notificaciones\AuthController;
use App\Http\Controllers\Notificaciones\AvisosController;
use App\Http\Controllers\Notificaciones\CorreoController;
use App\Http\Controllers\Notificaciones\TelegramNotificationController;
use App\Http\Controllers\Notificaciones\VerificationController;
use App\Http\Controllers\Cobro_Servicios\EquipamientosController;
use App\Http\Controllers\Cobro_Servicios\PreAvisoController;
use App\Http\Controllers\Cobro_Servicios\ExpensasController;
use App\Http\Controllers\Cobro_Servicios\MultasController;
use App\Models\Mantenimiento\CategoriaServicio;
use App\Http\Controllers\Mantenimiento\CategoriaServicioController;
use App\Http\Controllers\Mantenimiento\PersonalExternoController;
use App\Http\Controllers\Mantenimiento\RegistroSolicitudController;
use App\Http\Controllers\Mantenimiento\EstadoController;
use App\Http\Controllers\Mantenimiento\InsumoController;
use App\Http\Controllers\Mantenimiento\ListaCompraController;
use App\Http\Controllers\Empleados\WorkingHourController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// DEPARTAMENTOS

Route::controller(DepartamentoCotroller::class)->group(function(){
    Route::get('/departamentos','index')->name('departamento.index');
    Route::put('/departamentos/{id}/actualizarDisp','actualizarDisponibilidadDepa')->name('residente.actualizarDisponibilidadDepa');
    Route::post('/departamento','store')->name('departamento.store');
    Route::get('/departamento/{id}','show')->name('departamento.show');
    Route::post('/departamentoupd/{id}','update')->name('departamento.update');
    Route::delete('/departamento/{id}','destroy')->name('departamento.destroy');
    Route::put('/departamentoAct/{id}/actualizarOfertados','actualizarOfertados')->name('departamento.actualizarOfertados');
    //ruta para mantenimiento
    Route::get('/departamentos-by-edificios/{id}', 'getDepartamentosByEdificios')->name('departamento.getDepartamentosByEdificios');

    Route::get('/depart-disponible','getDepDisponible')->name('departamento.getDepDisponible');
});

Route::controller(BloqueController::class)->group(function(){
    Route::get('/bloques','index')->name('bloque.index');
    Route::post('/bloque','store')->name('bloque.store');
    Route::get('/bloque/{id}','show')->name('bloque.show');
    Route::post('/bloqueupd/{id}','update')->name('bloque.update');
    Route::delete('/bloque/{id}','destroy')->name('bloque.destroy');
    Route::get('/bloques-short','getBloquesShort')->name('bloque.getBloquesShort');
});

Route::controller(EdificioController::class)->group(function(){
    Route::get('/edificios','index')->name('edificio.index');
    Route::post('/edificio','store')->name('edificio.store');
    Route::get('/edificio/{id}','show')->name('edificio.show');
    Route::post('/edificioupd/{id}','update')->name('edificio.update');
    Route::delete('/edificio/{id}','destroy')->name('edificio.destroy');
    Route::get('/edificios-by-bloques/{id}', 'getEdificiosByBloques')->name('edificio.getEdificiosByBloques');
    Route::get('/edificios-short','getEdificiosShort')->name('edificio.getEdificiosShort');
    Route::get('/edificio-short/{id}','getEdificioShort')->name('edificio.getEdificioShort');
});
Route::controller(ResidenteController::class)->group(function(){
    Route::get('/residentes','index')->name('residente.index');
    Route::get('/residentes-disp/{estado}','getResidentesbyEstado')->name('residente.getResidentesbyEstado');
    Route::post('/residentes/actualizar-estado-contrato', 'actualizarEstadoContrato')->name('residente.actualizarEstadoContrato');
    Route::put('/residentes/{id}/actualizarEst','actualizarEstadoResidente')->name('residente.actualizarEstadoResidente');
    Route::put('/residentes/{id}/actualizarContrato','actualizarContrato')->name('residente.actualizarContrato');
    Route::post('/residente','store')->name('residente.store');
    Route::get('/residente/{id}','show')->name('residente.show');
    Route::put('/residenteupd/{id}','update')->name('residente.update');
    Route::delete('/residente/{id}','destroy')->name('residente.destroy');
    Route::post('/residente-csv','import')->name('residente.import');
    //obtener residentes de un contrato
    Route::get('/residentes-by-contrato/{id}', 'getResidentesByContrato')->name('residente.getResidentesByContrato');
    //obtener propietario de un contrato
    Route::get('/propietario-by-contrato/{id}', 'getPropietariosByContrato')->name('residente.getPropietariosByContrato');
    //obtener titulares de un contrato
    Route::get('/titular-by-contrato/{id}', 'getTitularByContrato')->name('residente.getTitularByContrato');
    //obtener titulares y propietarios para notificaciones generales
    Route::get('/notificacion-general', 'notificacionesGenerales')->name('residente.notificacionesGenerales');
    //ruta para mantenimiento
    Route::get('/residente-by-departamento/{id}', 'getResidenteByDepartamento')->name('residente.getResidenteByDepartamento');
    Route::get('/propietario-by-contratoS/{id}', 'getPropietByContratShort')->name('residente.getPropietByContratShort');
    Route::get('/titular-by-contratoS/{id}', 'getTituByContratShort')->name('residente.getTituByContratShort');

});
Route::controller(ContratoController::class)->group(function(){
    Route::get('/contratos','index')->name('contrato.index');
    Route::get('/contratosVigentes','contratosVigentes')->name('contrato.contratosVigentes');
    Route::post('/contrato','store')->name('contrato.store');
    Route::get('/contrato/{id}','show')->name('contrato.show');
    Route::put('/contratoupd/{id}','update')->name('contrato.update');
    Route::delete('/contrato/{id}','destroy')->name('contrato.destroy');
    Route::get('/contratoDep/{valorDepartamento}', 'buscarContratoPorDepartamento')->name('contrato.buscarContratoPorDepartamento');
    Route::get('/contratoDepS/{idDepartament}', 'getContratByDepShort')->name('contrato.getContratByDepShort');
    Route::put('/contratoNoVig/{id}/anularContrato','anularContrato')->name('contrato.anularContrato');
});

Route::controller(VisitaController::class)->group(function(){
    Route::get('/visitas','index')->name('visita.index');
    Route::get('/visita/{id}','show')->name('visita.show');
    Route::post('/visita','store')->name('visita.store');
    Route::put('/visitaDes/{id}/desactivar','desactivarVisita')->name('visita.desactivarVisita');
    Route::delete('/visita/{id}','destroy')->name('visita.destroy');
});

Route::controller(ParqueoController::class)->group(function(){
    Route::get('/parqueos','index')->name('parqueo.index');
    Route::post('/parqueo','store')->name('parqueo.store');
    Route::get('/parqueo/{id}','show')->name('parqueo.show');
    Route::put('/parqueoupd/{id}','update')->name('parqueo.update');
    Route::delete('/parqueo/{id}','destroy')->name('parqueo.destroy');
    Route::get('/parqueo-by-departamento/{id}', 'getParqueosByDepartamento')->name('parqueo.getParqueosByDepartamento');
});

// EMPLEADOS
Route::post('/add_employee', [EmployeeController::class, 'store']);
Route::get('/get_all_employees', [EmployeeController::class, 'getAll']);
Route::delete('/delete_employee/{id}', [EmployeeController::class, 'delete']);
Route::get('/get_employee/{id}', [EmployeeController::class, 'getById']);
Route::post('/update_employee/{id}', [EmployeeController::class, 'update']);
Route::post('/updateContractStatus/{id}', [EmployeeController::class, 'updateContractStatus']);
Route::get('/get_employee_with_contract', [EmployeeController::class, 'getEmployeeWithContract']);


Route::post('/add_contract', [ContractController::class, 'store']);

Route::post('/add_working_hour', [WorkingHourController::class, 'store']);
Route::delete('/borrar_horarios_dado_empleado/{id}', [WorkingHourController::class, 'borrarTodosDadoEmpleado']);

Route::post('marcar_hora_empleado',[EmployeeController::class, 'marcarHora']);
Route::get('/obtener_atrasos',[AtrasoController::class, 'obtenerAtrasos']);
Route::post('/actualizar_motivo/{id}',[AtrasoController::class, 'actualizarMotivo']);

Route::post('/add_area', [AreaController::class, 'store']);
Route::get('/get_all_areas', [AreaController::class, 'getAll']);

Route::post('/add_benefit', [BenefitController::class, 'store']);
Route::get('/get_all_benefits', [BenefitController::class, 'getAll']);

Route::post('/add_position', [PositionController::class, 'store']);
Route::get('/get_all_positions', [PositionController::class, 'getAll']);



// MANTENIMIENTO
Route::get('/CategoriaServicio', [CategoriaServicioController::class,'getCategoriaServicio']);
Route::get('/CategoriaServicio/{id}', [CategoriaServicioController::class,'getCategoriaId']);
Route::post('/CategoriaServicio/insert', [CategoriaServicioController::class,'insertarCategoria']);
Route::put('/CategoriaServicio/update/{id}', [CategoriaServicioController::class,'updateCategoria']);
Route::delete('/CategoriaServicio/delete/{id}', [CategoriaServicioController::class,'deleteCategoria']);

Route::get('/personal-externo', [PersonalExternoController::class,'getPersonalExterno']);
Route::get('/personal-externo/{id}', [PersonalExternoController::class,'getPersonalExternoId']);
Route::post('/personal-externo/insert', [PersonalExternoController::class,'insertPersonalExterno']);
Route::put('/personal-externo/update/{id}', [PersonalExternoController::class,'updatePersonalExterno']);
Route::delete('/personal-externo/delete/{id}', [PersonalExternoController::class,'deletePersonalExterno']);
Route::get('/personal-externo-by-categoria/{id}', [PersonalExternoController::class,'getPersonalExternoByCategoria']);

Route::get('/registro-solicitud', [RegistroSolicitudController::class,'getRegistroSolicitud']);
Route::get('/registro-solicitud/{id}', [RegistroSolicitudController::class,'getRegistroSolicitudId']);
Route::post('/registro-solicitud/insert', [RegistroSolicitudController::class,'insertRegistroSolicitud']);
Route::put('/registro-solicitud/update/{id}', [RegistroSolicitudController::class,'updateRegistroSolicitud']);
Route::delete('/registro-solicitud/delete/{id}', [RegistroSolicitudController::class,'deleteRegistroSolicitud']);
Route::get('/solicitudes-by-encargado/{id}', [RegistroSolicitudController::class,'getSolicitudByPersonalExterno']);

Route::get('/insumo', [InsumoController::class,'getInsumo']);
Route::get('/insumo/solicitud', [InsumoController::class,'getInsumoBySolicitud']);
Route::get('/insumo/solicitud-all/{id}', [InsumoController::class,'getInsumosBySolicitudAll']);
Route::get('/insumo/categoria/{id}', [InsumoController::class,'getInsumosByCategoria']);
Route::get('/insumo/{id}', [InsumoController::class,'getInsumoId']);
Route::post('/insumo/insert', [InsumoController::class,'insertInsumo']);
Route::put('/insumo/update/{id}', [InsumoController::class,'updateInsumo']);
Route::delete('/insumo/delete/{id}', [InsumoController::class,'deleteInsumo']);
Route::delete('/insumo/delete/solicitud/{id}', [InsumoController::class,'deleteInsumoBySolicitud']);

Route::get('/estado-solicitud', [EstadoController::class,'getEstado']);
Route::get('/estado-solicitud/{id}', [EstadoController::class,'getEstadoId']);

Route::get('/lista-compra', [ListaCompraController::class,'getListaCompra']);
Route::post('/lista-compra/insert', [ListaCompraController::class,'insertRegistroCompra']);
Route::put('/lista-compra/update/{id}', [ListaCompraController::class,'updateRegistroCompra']);

// COMMON AREAS
Route::get('/common-areas/{id}/reservations', [CommonAreaController::class, 'reservations']);
Route::apiResource('/common-areas/reservations', ReservationController::class);
Route::apiResource('/common-areas', CommonAreaController::class);
Route::apiResource('/equipments', EquipmentController::class);

// Route::get('/equipments', [CommonAreaController::class, 'indexEquipment']);
// Route::post('/equipments', [CommonAreaController::class, 'storeEquipment']);
// Route::patch('/equipments/{id}', [CommonAreaController::class, 'updateEquipment']);
// Route::delete('/equipments/{id}', [CommonAreaController::class, 'destroyEquipment']);
// Route::get('/equipments/{id}', [CommonAreaController::class, 'showEquipment']);

Route::post('/reports', [CommonAreaController::class, 'createReport']);
Route::get('/reports', [CommonAreaController::class, 'getReports']);


//Cobro_Servicios
Route::controller(EquipamientosController::class)->group(function(){
    Route::post('/agregarEquipo', [EquipamientosController::class, 'store']);
    Route::get('/obtenerAreasComunes', [EquipamientosController::class, 'getAllCommonAreas']);
    Route::get('/obtenerAreasComunesID',[EquipamientosController::class,'getAllCommonAreasID']);
    Route::get('/obtener-equipamientos', [EquipamientosController::class, 'getAllEquipamientos']);
    Route::get('/obtener-equipamiento/{id}', [EquipamientosController::class, 'getEquipoById']);
    Route::delete('/eliminar-equipo/{id}', [EquipamientosController::class, 'delete']);
    Route::put('/editar-equipo/{id}', [EquipamientosController::class, 'edit']);
});

Route::get('/common-areas/{id}/reservaPagada', [CommonAreaController::class, 'reservaPagada']);
Route::put('/common-areas/{id}/pagarReserva', [CommonAreaController::class, 'pagarReserva']);

Route::controller(PreAvisoController::class)->group(function(){
    Route::get('/obtener-departamentos', [PreAvisoController::class, 'obtenerNombresDepartamentos']);
    Route::post('/generar-preaviso', [PreAvisoController::class, 'store']);
    Route::get('/obtener-preavisos', [PreAvisoController::class, 'obtenerTodosPreAvisos']);
    //Route::get('/obtener-preaviso/{id}', [PreAvisoController::class, 'show']);
    //Route::put('/editar-preaviso/{id}', [PreAvisoController::class, 'update']);
    //Route::delete('/eliminar-preaviso/{id}', [PreAvisoController::class, 'destroy']);

});
Route::controller(ExpensasController::class)->group(function(){
    Route::put('/expensas/{id}/pagarExpensa', [ExpensasController::class, 'pagar']);

    Route::post('/generar-expensa', [ExpensasController::class, 'store']);
    Route::get('/obtener-expensas', [ExpensasController::class, 'index']);
    Route::get('/obtener-expensas/{id}', [ExpensasController::class, 'show']);
    Route::put('/editar-expensas/{id}', [ExpensasController::class, 'update']);
    Route::delete('/eliminar-expensas/{id}', [ExpensasController::class, 'destroy']);
});

Route::controller(MultasController::class)->group(function(){
    Route::post('/agregar-multita', [MultasController::class, 'guardoMulta']);
    Route::get('/obtener-multa', [MultasController::class, 'index']);
    Route::get('/PreAvisoMulta/{id}', [MultasController::class, 'show']);
    Route::put('/editar-multa/{id}', [MultasController::class, 'update']);
    Route::delete('/eliminar-multa/{id}', [MultasController::class, 'destroy']);
    Route::put('/actualizar-monto-preaviso/{id}',[MultasController::class,'actualizarMonto']);
    Route::get('/PreAvisoMulta', [MultasController::class, 'obtenerPreAvisosConMultas']);
    Route::get('/PreAvisoSinMulta', [MultasController::class, 'obtenerPreAvisosSinMultas']);
    Route::get('/obtener-multas-preaviso/{id}', [MultasController::class, 'obtenerMultasPorPreaviso']);

});

// Notificaciones
Route::controller(PersonaController::class)->group(function() {
    Route::post('/add_persona', 'store');
    Route::get('/persons', 'index');
});

Route::group(['prefix' =>  'v1'], function () {
    Route::post('send', [AuthController::class, 'send']);
    Route::post('email/verify/{id}', [VerificationController::class,'verify'])->name('verification.verify');
});

//emails de preavisso
Route::post('/cobrar-servicio', [CorreoController::class, 'enviarCorreo']);

Route::controller(TelegramNotificationController::class)->group(function() {
    Route::post('/telegram/notification', 'sendNoticeToOne');
    Route::post('/telegram/notifications', 'sendNoticeToMany');
});Route::get('/obtener-equipamientos', [EquipamientosController::class, 'getAllEquipamientos']);

Route::get("/avisos",[AvisosController::class,"index"]);
Route::post("/avisos",[AvisosController::class,"store"]);
Route::get("/avisos/{id}",[AvisosController::class,"show"]);
Route::put("/avisos/{id}",[AvisosController::class,"update"]);
Route::delete("/avisos/{id}",[AvisosController::class,"destroy"]);

Route::get('/obtener-equipamiento/{id}', [EquipamientosController::class, 'getEquipoById']);
    Route::delete('/eliminar-equipo/{id}', [EquipamientosController::class, 'delete']);
    Route::put('/editar-equipo/{id}', [EquipamientosController::class, 'edit']);



