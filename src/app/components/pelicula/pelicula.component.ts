import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  pelicula: any;
  pagina: string;
  busqueda: string;
  constructor(public route: ActivatedRoute,
              public router: Router,
              public ps: PeliculasService) {
    this.route.params.subscribe(params => {
      if (params.busqueda) {
        this.busqueda = params.busqueda;
      }
      this.ps.getPelicula(params.id).subscribe(data => {
        this.pelicula =  data;
        this.pagina = params.pag;
        console.log(this.pelicula, this.pagina);
      });
    });
  }

  regresar() {
    this.router.navigate([this.pagina, this.busqueda ? this.busqueda : '']);
  }

  ngOnInit(): void {
  }

}
