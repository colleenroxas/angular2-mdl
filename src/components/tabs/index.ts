import { MdlTabsComponent } from './mdl-tabs.component';
import { MdlTabPanelComponent } from './mdl-tab-panel.component';
import { MdlTabPanelTitleComponent } from './mdl-tab-panel-title.component';
import { NgModule } from '@angular/core';
import { MdlCommonModule } from './../common/mdl-ripple.directive';
import { CommonModule } from '@angular/common';


export * from './mdl-tabs.component';
export * from './mdl-tab-panel.component';
export * from './mdl-tab-panel-title.component';

/** @deprecated */
export const MDL_TABS_DIRECTIVES = [
  MdlTabsComponent,
  MdlTabPanelComponent,
  MdlTabPanelTitleComponent
];

@NgModule({
  imports: [MdlCommonModule, CommonModule],
  exports: MDL_TABS_DIRECTIVES,
  declarations: MDL_TABS_DIRECTIVES,
})
export class MdlTabsModule {}
