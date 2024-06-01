import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BuildIcon from "@mui/icons-material/Build";
import ApartmentIcon from "@mui/icons-material/Apartment";
import NotificationPage from "../pages/notifications/NotificationPage";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EngineeringIcon from "@mui/icons-material/Engineering";

import CrearDepa from "../departamento/components/CrearDepartamento.js";
import Depa from "../departamento/components/MostrarDep.js";
import EditarDep from "../departamento/components/EditarDep.js";
import RegistrarResidente from "../departamento/components/CrearResidente";
import CrearContrato from "../departamento/components/CrearContrato";
import MostrarResidentes from "../departamento/components/MostrarResidentes";
import InfoDepartamento from "../departamento/components/InfoDepartamento";
import GestionVisitas from "../departamento/components/GestionVisitas";
import RegistrarVisita from "../departamento/components/RegistrarVisita";
import EditarContrato from "../departamento/components/EditarContrato";
import MostrarEdificio from "../departamento/components/MostrarEdificios";
import RegistrarParqueo from "../departamento/components/RegistrarParqueo";
import CrearEdificio from "../departamento/components/CrearEdificio";
import VisualizarParqueos from "../departamento/components/VisualizarParqueos";
import HistorialVisitas from "../departamento/components/HistorialVisitas";

import AgregarEquipo from "../cobro_servicios/components/AgregarEquipo.js";
import PagoAreaComun from "../cobro_servicios/components/PagoAreaComun";
import Cobros from "../cobro_servicios/components/gestionCobros.js";
import CobrosLayout from "../pages/dashboard/CobrosLayout";

import EmployeHomePage from "../empleados/pages/homePageEmpleados";
import EmployeeEdit from "../empleados/pages/employee_edit";
import EmployeeRegister from "../empleados/pages/employee_register";
import DashboardEmployee from "../pages/dashboard/DashboardEmployee";
import ContractRegister from "../empleados/pages/contract_register";
import AssignContract from "../empleados/pages/assign_contract";
import AssignTurn from "../empleados/pages/assign_turn";
import TurnRegister from "../empleados/pages/turn_register";
import MarcarHora from "../empleados/pages/marcar_hora";
import ControlRetrasos from "../empleados/pages/retrasos/control_retrasos";
import ControlFaltas from "../empleados/pages/faltas/control_faltas";
import InformacionFalta from "../empleados/pages/faltas/informacion_falta";
import InformacionRetraso from "../empleados/pages/retrasos/informacion_retraso";
import EditarTurno from "../empleados/pages/turnos/editar_turno";
import VerAreas from "../empleados/pages/areas/ver_areas";
import VerBeneficios from "../empleados/pages/beneficios/ver_beneficios";
import ControlReportes from "../empleados/pages/reportes/control_reportes";

import CommonAreasLayout from "../common-areas/CommonAreasLayout";
import CreatePage from "../common-areas/dashboard/common-area/pages/create-page/CreatePage";
import ListPage from "../common-areas/dashboard/common-area/pages/list-page/ListPage";
import UpdatePage from "../common-areas/dashboard/common-area/pages/update-page/UpdatePage";
import CalendarPage from "../common-areas/dashboard/common-area/pages/calendar-page/CalendarPage";
import ReservationPage from "../common-areas/dashboard/reservation/pages/create-page/CreatePage";
import InventoryPage from "../common-areas/dashboard/equipment/pages/inventory-page/InventoryPage";
import ReportPage from "../common-areas/dashboard/detail/pages/report-page/reportPage";
import FormularioPagoArea from "../cobro_servicios/components/FormularioPagoArea";
import { RegistrarPersona } from "../notificaciones/pages/registrarPersona";
import { SendTelegramNotification } from "../notificaciones/pages/sendTelegramNotification";
import { NotificationsList } from "../notificaciones/pages/NotificationsList";
import NotificationEmail from "../notificaciones/pages/NotificationEmail";

import PersonalPage from "../mantenimiento/personal/PersonalPage";
import RegistroServicioPage from "../mantenimiento/registro_servicio/RegistroServicioPage";
import ListaSolicitudServicioPage from "../mantenimiento/lista_solicitud/ListaSolicitudServicioPage";
import ChangelogPageLayout from "../mantenimiento/ChangelogPageLayout";
import Changelog from "../pages/changelog/ChangelogPage";
import RegistrarInsumoPage from "../mantenimiento/registro_insumo/RegistrarInsumoPage";
import ListaInsumoPage from "../mantenimiento/lista_insumo/ListaInsumoPage";
import ListaComprasPage from "../mantenimiento/lista_compras/ListaComprasPage";
import RegistroComprasPage from "../mantenimiento/registro_compras/RegistroComprasPage";

import TablaReservas from "../cobro_servicios/components/TablaReservas";
import GestionEquipos from "../cobro_servicios/components/gestionEquipos.js";
import EditarEquipo from "../cobro_servicios/components/editarEquipo";
import GenerarPreAviso from "../cobro_servicios/components/Pre-aviso";
import PreAvisoExpensas from "../cobro_servicios/components/Pre-avisoExpensas.js";

import ReportListPage from "../common-areas/dashboard/detail/pages/list-page/ReportListPage";
import Expensas from "../cobro_servicios/components/Expensas";

import Imprimir from "../notificaciones/pages/Imprimir";
import Multas from "../cobro_servicios/components/Multas";
import FormularioPagoExpensa from "../cobro_servicios/components/FormularioPagoExpensa";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },

  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Departamentos",
      icon: <ApartmentIcon />
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index"
      },
      {
        path: "/dashboard/crearEdificio",
        element: <CrearEdificio />,
        state: "dashboard.crearEdificio",
        sidebarProps: {
          displayText: "Registrar Edificio"
        },
      },
      {
        path: "/dashboard/crearDepa",
        element: <CrearDepa />,
        state: "dashboard.crearDepa",
        sidebarProps: {
          displayText: "Registrar Departamento"
        },
      },
      {
        path: "/dashboard/edificios",
        element: <MostrarEdificio />,
        state: "dashboard.edificios",
        sidebarProps: {
          displayText: "GestionarDepartamento"
        },
      },
      {
        path: "/dashboard/departamentos",
        element: <Depa />,
        state: "dashboard.departamentos",
      },
      {
        path: "/dashboard/RegResidente",
        element: <RegistrarResidente />,
        state: "dashboard.regResidente",
        sidebarProps: {
          displayText: "Registrar Residente"
        },
      },
      {
        path: "/dashboard/editarDepa",
        element: <EditarDep />,
        state: "dashboard.editDepa",
      },
      {
        path: "/dashboard/crearContrato",
        element: <CrearContrato />,
        state: "dashboard.crearContrato",
      },
      {
        path: "/dashboard/editContrato",
        element: <EditarContrato />,
        state: "dashboard.editContrato",
      },
      {
        path: "/dashboard/infoDepartamento",
        element: <InfoDepartamento />,
        state: "dashboard.infoDepartamento",
      },
      {
        path: "/dashboard/residentes",
        element: <MostrarResidentes />,
        state: "dashboard.residentes",
        sidebarProps: {
          displayText: "Residentes"
        },
      },
      {
        path: "/dashboard/visitas",
        element: <GestionVisitas />,
        state: "dashboard.visitas",
        sidebarProps: {
          displayText: "Gestionar Visitas"
        },
      },
      {
        path: "/dashboard/registrarVisita",
        element: <RegistrarVisita />,
        state: "dashboard.registrarVisita",
      },
      {
        path: "/dashboard/historialVisitas",
        element: <HistorialVisitas />,
        state: "dashboard.historialVisitas",
        sidebarProps: {
          displayText: "Historial de Visitas"
        },
      },
      {
        path: "/dashboard/parqueo",
        element: <RegistrarParqueo />,
        state: "dashboard.parqueo",
        sidebarProps: {
          displayText: "Gestionar Parqueos"
        },
      },
      {
        path: "/dashboard/visualizarParqueo",
        element: <VisualizarParqueos />,
        state: "dashboard.visualizarParqueo",
        sidebarProps: {
          displayText: "Visualizar Parqueos"
        },
      },
    ]
  },

  {
    path: "/cobros",
    element: <CobrosLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Cobro por Servicios",
      icon: <MonetizationOnIcon />,
    },
    child: [
      {
        path: "/cobros/pre-aviso",
        element: <Cobros />,
        state: "cobros.alert",
        sidebarProps: {
          displayText: "Generar pre-aviso",
        },
      },
      {
        path: "/cobros/pre-avisoExpensas",
        element: <PreAvisoExpensas />,
        state: "cobros.alertita",
        sidebarProps: {
          displayText: "Pre-aviso de expensas",
        },
      },
      {
        path: "/cobros/agregar-equipo",
        element: <AgregarEquipo />,
        state: "component.button",
        sidebarProps: {
          displayText: "Agregar equipo dañado",
        },
      },
      {
        path: "/cobros/gestion-equipo",
        element: <GestionEquipos />,
        state: "cobros.alerta",
        sidebarProps: {
          displayText: "Gestion de equipos dañados",
        },
      },
      {
        path: "/cobros/expensas",
        element: <Expensas />,
        state: "cobros.expensas",
        sidebarProps: {
          displayText: "Expensas",
        },
      },
      {
        path: "/cobros/edicion-equipo/:id",
        element: <EditarEquipo />,
        state: "cobros.editar-equipo",
      },
      {
        path: "/cobros/generar-preaviso/:departamento_id",
        element: <GenerarPreAviso />,
        state: "cobros.generar-pre-aviso",
      },
      {
        path: "/cobros/multas/:idPreaviso",
        element: <Multas />,
        state: "cobros.generar-pre-aviso",
      },
      {
        path: "/cobros/pagar-reserva/",
        element: <PagoAreaComun />,
        state: "cobros.pago-areacomun",
        sidebarProps: {
          displayText: "Pagar reserva",
        },
      },
      {
        path: "/cobros/pagar-reserva/:id",
        element: <TablaReservas />,
        state: "cobros.tabla.reservas",
      },
      {
        path: "/cobros/pagar-expensa/:id",
        element: <FormularioPagoExpensa />,
        state: "cobros.formulario.expensa",
      },
      {
        path: "/cobros/pagar-reserva-area/:id",
        element: <FormularioPagoArea />,
        state: "cobros.formulario.pago",
      },
    ],
  },

  {
    path: "/areas-comunes",
    element: <CommonAreasLayout />,
    state: "areas-comunes",
    sidebarProps: {
      displayText: "Areas Comunes",
      icon: <ApartmentIcon />,
    },
    child: [
      {
        path: "/areas-comunes/crear",
        element: <CreatePage />,
        state: "areas-comunes.registrar",
        sidebarProps: {
          displayText: "Crear Area Comun",
        },
      },
      {
        path: "/areas-comunes",
        element: <ListPage />,
        state: "areas-comunes.listar",
        sidebarProps: {
          displayText: "Listar Areas Comunes",
        },
      },
      {
        path: "/areas-comunes/:id",
        element: <UpdatePage />,
        state: "areas-comunes.actualizar",
      },
      {
        path: "/areas-comunes/calendario/:id",
        element: <CalendarPage />,
        state: "areas-comunes.calendario",
      },
      {
        path: "/areas-comunes/reservar/:id",
        element: <ReservationPage />,
        state: "areas-comunes.reservar",
      },
      {
        path: "/areas-comunes/inventario",
        element: <InventoryPage />,
        state: "areas-comunes.inventario",
        sidebarProps: {
          displayText: "Inventario",
        },
      },
      {
        path: "/areas-comunes/reportes",
        element: <ReportListPage />,
        state: "areas-comunes.reportes",
        sidebarProps: {
          displayText: "Reportes",
        },
      },
      {
        path: "/areas-comunes/crear-reporte",
        element: <ReportPage />,
        state: "areas-comunes.crear-reporte",
        sidebarProps: {
          displayText: "Crear Reporte",
        },
      },
    ],
  },

  {
    path: "/changelog",
    element: <ChangelogPageLayout />,
    state: "changelog",
    sidebarProps: {
      displayText: "Mantenimiento",
      icon: <BuildIcon />,
    },
    child: [
      {
        path: "/changelog/registrar_servicio",
        element: <Changelog />,
        state: "changelog.servicio",
        sidebarProps: {
          displayText: "Administrar categoria ",
        },
      },
      {
        path: "/changelog/personal",
        element: <PersonalPage />,
        state: "changelog.personal",
        sidebarProps: {
          displayText: "Administrar personal",
        },
      },
      {
        path: "/changelog/registro",
        element: <RegistroServicioPage />,
        state: "changelog.registro",
        sidebarProps: {
          displayText: "Registrar solicitud ",
        },
      },
      {
        path: "/changelog/solicitud",
        element: <ListaSolicitudServicioPage />,
        state: "changelog.solicitud",
        sidebarProps: {
          displayText: "Solicitudes ",
        },
      },
      //Registro insumo

      {
        path: "/changelog/registrar_insumo",
        element: <RegistrarInsumoPage />,
        state: "changelog.solicitud",
        // sidebarProps: {
        //   displayText: "Registrar insumo",
        // },
      },
      //Lista Insumo
      {
        path: "/changelog/lista_insumo",
        element: <ListaInsumoPage />,
        state: "changelog.solicitud",
        sidebarProps: {
          displayText: "Insumos",
        },
      },
      //Lista compras
      {
        path: "/changelog/lista_compras",
        element: <ListaComprasPage />,
        state: "changelog.solicitud",
        sidebarProps: {
          displayText: "Lista de Compras",
        },
      },
      //Registro compras
      {
        path: "/changelog/registro_compras",
        element: <RegistroComprasPage />,
        state: "changelog.solicitud",
        // sidebarProps: {
        //   displayText: "Lista de Compras",
        // },
      },
    ],
  },

  {
    path: "/notifications",
    element: <NotificationPage />,
    state: "notification",
    sidebarProps: {
      displayText: "Notificaciones",
      icon: <NotificationsActiveIcon />,
    },
    child: [
      /*{
        path: "/notifications/registrar",
        element: <RegistrarPersona />,
        state: "usuario.registrar",
        sidebarProps: {
          displayText: "Registro Persona",
        },
      },*/
      {
        path: "/notifications/list",
        element: <NotificationsList />,
        state: "notificacion.lista",
        sidebarProps: {
          displayText: "Lista de Avisos",
        },
      },
      {
        path: "/notifications/email",
        element: <NotificationEmail />,
        state: "notificacion.email",
        sidebarProps: {
          displayText: "Enviar email",
        },
      },
      {
        path: "/notifications/send/telegram",
        element: <SendTelegramNotification />,
        state: "telegram.enviar",
      },
    ],
  },

  {
    path: "/employees",
    element: <DashboardEmployee />,
    state: "employee",
    sidebarProps: {
      displayText: "Empleados",
      icon: <EngineeringIcon />,
    },
    child: [
      {
        index: true,
        element: <EmployeHomePage />,
        state: "employee.index",
      },
      {
        path: "/employees/default",
        element: <EmployeHomePage />,
        state: "employee.default",
        sidebarProps: {
          displayText: "Pagina Principal",
        },
      },
      {
        path: "/employees/employeeRegister",
        element: <EmployeeRegister />,
        state: "employee.analytics",
        sidebarProps: {
          displayText: "Registro",
        },
      },

      {
        path: "/employees/assignContract",
        element: <AssignContract />,
        state: "employee.analytics",
        sidebarProps: {
          displayText: "Asignar contrato",
        },
      },

      {
        path: "/employees/assignTurn",
        element: <AssignTurn />,
        state: "employee.analytics",
        sidebarProps: {
          displayText: "Asignar turnos",
        },
      },

      {
        path: "/employees/marcar_hora",
        element: <MarcarHora />,
        state: "employee.analytics",
        sidebarProps: {
          displayText: "Marcar Hora",
        },
      },

      {
        path: "/employees/control_retrasos",
        element: <ControlRetrasos />,
        state: "employee.analytics",
        sidebarProps: {
          displayText: "Control de retrasos",
        },
      },

      {
        path: "/employees/control_faltas",
        element: <ControlFaltas />,
        state: "employee.analytics",
        sidebarProps: {
          displayText: "Control de faltas",
        },
      },

      

      {
        path: "/employees/ver_areas",
        element: <VerAreas />,
        state: "employee.analytics",
        sidebarProps: {
          displayText: "Areas",
        },
      },

      {
        path: "/employees/ver_beneficios",
        element: <VerBeneficios />,
        state: "employee.analytics",
        sidebarProps: {
          displayText: "Beneficios",
        },
      },

      {
        path: "/employees/control_reportes",
        element: <ControlReportes />,
        state: "employee.analytics",
        sidebarProps: {
          displayText: "Reportes",
        },
      },

      {
        path: "/employees/employeeEdit",
        element: <EmployeeEdit />,
        state: "employee.analytics",
      },

      {
        path: "/employees/contractRegister",
        element: <ContractRegister />,
        state: "employee.analytics",
      },

      {
        path: "/employees/turnRegister",
        element: <TurnRegister />,
        state: "employee.analytics",
      },

      {
        path: "/employees/informacionFalta",
        element: <InformacionFalta />,
        state: "employee.analytics",
      },

      {
        path: "/employees/informacionRetraso",
        element: <InformacionRetraso />,
        state: "employee.analytics",
      },

      {
        path: "/employees/editarTurno",
        element: <EditarTurno />,
        state: "employee.analytics",
      },
    ],
  },
];

export default appRoutes;
