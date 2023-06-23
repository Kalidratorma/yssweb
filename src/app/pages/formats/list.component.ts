import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { GameFormatService } from '../../services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    gameFormats?: any[];

    constructor(private gameFormatService: GameFormatService) {}

    ngOnInit() {
        this.gameFormatService.getAll()
            .pipe(first())
            .subscribe(gameFormats => this.gameFormats = gameFormats);
    }

    deleteGameFormat(id: number) {
        const user = this.gameFormats!.find(x => x.id === id);
        user.isDeleting = true;
        this.gameFormatService.delete(id)
            .pipe(first())
            .subscribe(() => this.gameFormats = this.gameFormats!.filter(x => x.id !== id));
    }
}
