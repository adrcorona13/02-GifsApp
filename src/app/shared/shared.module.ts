import { NgModule } from '@angular/core';
import { SideBarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        SideBarComponent
    ],
    exports:[
        SideBarComponent
    ],
    imports:[
        CommonModule
    ]
})
export class SharedModule{

}