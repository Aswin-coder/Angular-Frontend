import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DesignRoutingModule } from './design-routing.module';

import { DesignColorsComponent } from './colors/colors.component';
import { DesignIconsComponent } from './icons/icons.component';
import { NgxPaginationModule } from 'ngx-pagination';

const COMPONENTS: any[] = [DesignColorsComponent, DesignIconsComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, DesignRoutingModule,NgxPaginationModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class DesignModule {}
