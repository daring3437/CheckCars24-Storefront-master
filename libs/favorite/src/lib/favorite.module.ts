import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteListComponent } from './components/page/favorite-list/favorite-list.component';
import { RouterModule } from '@angular/router';
import { favoriteRoutes } from './favorite.routes';

//todo: Check circular dependencies
import { SharedModule } from '@checkcars/shared';
import { ProductCardModule } from '@checkcars/widgets';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(favoriteRoutes),
    SharedModule,
    ProductCardModule,
    TranslateModule,
  ],
  declarations: [FavoriteListComponent],
})
export class FavoriteModule {}
