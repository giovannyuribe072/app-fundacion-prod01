import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'bandeja',
        children: [
          {
            path: '',
            loadChildren: () => import('../bandeja/bandeja.module').then(m => m.BandejaPageModule) 
          }
        ]
      },
      {
        path: 'creacionusuarios',
        children: [
          {
            path: '',
            loadChildren: () => import('../creacionusuarios/creacionusuarios.module').then(m => m.CreacionUsuariosPageModule) 
          }
        ]
      } ,
      {
        path: 'periodocobertura',
        children: [
          {
            path: '',
            loadChildren: () => import('../periodocobertura/periodocobertura.module').then(m => m.PeriodoCoberturaPageModule) 
          }
        ]
      },
      {
        path: 'garantias',
        children: [
          {
            path: '',
            loadChildren: () => import('../garantias/garantias.module').then(m => m.GarantiasPageModule) 
          }
        ]
      },
      {
        path: 'factura',
        children: [
          {
            path: '',
            loadChildren: () => import('../factura/factura.module').then(m => m.FacturaPageModule) 
          }
        ]
      },
      {
        path: 'comprobante',
        children: [
          {
            path: '',
            loadChildren: () => import('../comprobante/comprobante.module').then(m => m.ComprobantePageModule) 
          }
        ]
      },
      {
        path: 'historico',
        children: [
          {
            path: '',
            loadChildren: () => import('../historico/historico.module').then(m => m.HistoricoPageModule) 
          }
        ]
      } ,
      {
        path: 'consolidado',
        children: [
          {
            path: '',
            loadChildren: () => import('../consolidado/consolidado.module').then(m => m.ConsolidadoPageModule) 
          }
        ]
      },
      {
        path: 'cobrocredito',
        children: [
          {
            path: '',
            loadChildren: () => import('../cobrogarantias/cobrogarantias.module').then(m => m.CobroGarantiasPageModule) 
          }
        ]
      },
      {
        path: 'verificacioncobrogarantias',
        children: [
          {
            path: '',
            loadChildren: () => import('../verificacioncobrogarantias/cobrogarantias.module').then(m => m.CobroGarantiasPageModule) 
          }
        ]
      }
      ,
      {
        path: 'cartera',
        children: [
          {
            path: '',
            loadChildren: () => import('../cartera/cartera.module').then(m => m.CarteraPageModule) 
          }
        ]
      }
      ,
      {
        path: 'buscarclientes',
        children: [
          {
            path: '',
            loadChildren: () => import('../buscarclientes/buscarclientes.module').then(m => m.BuscarClientesPageModule) 
          }
        ]
      }
      ,
      {
        path: 'seguimiento',
        children: [
          {
            path: '',
            loadChildren: () => import('../seguimiento/seguimiento.module').then(m => m.SeguimientoPageModule) 
          }
        ]
      }
      ,
      {
        path: 'aplicarpagos',
        children: [
          {
            path: '',
            loadChildren: () => import('../aplicarpagos/aplicarpagos.module').then(m => m.AplicarPagosPageModule) 
          }
        ]
      }
      ,
      {
        path: 'reportecobranza',
        children: [
          {
            path: '',
            loadChildren: () => import('../reportecobranza/reportecobranza.module').then(m => m.ReporteCobranzaPageModule) 
          }
        ]
      } ,
      {
        path: 'informe',
        children: [
          {
            path: '',
            loadChildren: () => import('../reportes/reportes.module').then(m => m.HomePageModule) 
          }
        ]
      },
      {
        path: 'gestion',
        children: [
          {
            path: '',
            loadChildren: () => import('../reportesgestion/reportes.module').then(m => m.HomePageModule) 
          }
        ]
      },
      {
        path: 'operacion',
        children: [
          {
            path: '',
            loadChildren: () => import('../reporteoperacion/reportes.module').then(m => m.HomePageModule) 
          }
        ]
      },
      {
        path: 'reprocesos',
        children: [
          {
            path: '',
            loadChildren: () => import('../reprocesos/reportes.module').then(m => m.HomePageModule) 
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/bandeja',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPageRoutingModule {}
