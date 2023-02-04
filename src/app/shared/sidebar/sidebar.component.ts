import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
    selector:'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SideBarComponent{

    items: string[] = [];

    get historial(){
        return this.gifService.historial;
    }

    buscar(query: string){
        this.gifService.buscarGifts(query);
    }

    constructor(private gifService:GifsService){
        
    }
}