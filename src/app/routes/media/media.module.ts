import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MediaRoutingModule } from './media-routing.module';
import { MediaGalleryComponent } from './gallery/gallery.component';
import { EditroleComponent } from './editrole/editrole.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const COMPONENTS: any[] = [MediaGalleryComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, MediaRoutingModule,FontAwesomeModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, EditroleComponent],
  exports: [
    EditroleComponent
  ],
})
export class MediaModule {}
