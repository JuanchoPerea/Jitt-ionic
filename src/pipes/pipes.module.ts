import { NgModule } from '@angular/core';
import { GroupfilterPipe } from './groupfilter/groupfilter';
import { PruebafilterPipe } from './pruebafilter/pruebafilter';
@NgModule({
	declarations: [GroupfilterPipe,
    PruebafilterPipe],
	imports: [],
	exports: [GroupfilterPipe,
    PruebafilterPipe]
})
export class PipesModule {}
