import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  buscar = '';
  constructor(public ps: PeliculasService,
              private route: ActivatedRoute) {
                this.route.params.subscribe(parametros => {
                  if (parametros.texto) {
                    this.buscar = parametros.texto;
                    this.buscarPelicula();
                  }
                });
              }

  ngOnInit(): void {
  }

  buscarPelicula() {
    if (this.buscar.length === 0) {
      return;
    } else {
      this.ps.buscarPelicula(this.buscar)
          .subscribe();
    }
  }

}
