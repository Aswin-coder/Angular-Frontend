import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditroleComponent } from './editrole/editrole.component';
import { MediaGalleryComponent } from './gallery/gallery.component';

const routes: Routes = [{ path: 'createrole', component: MediaGalleryComponent },
{ path: 'editrole', component: EditroleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaRoutingModule {}
