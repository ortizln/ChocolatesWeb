import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  post = {
    id: 1,
    title: 'El Origen del Cacao Peruano',
    slug: 'origen-cacao-peruano',
    summary: 'Descubre la historia y las variedades del cacao peruano, considerado uno de los mejores del mundo.',
    content: `<p>El Perú es reconocido mundialmente como uno de los centros de origen del cacao. Desde tiempos precolombinos, las culturas ancestrales ya cultivaban y utilizaban este valioso grano en ceremonias y como moneda de intercambio.</p>
    <p>El cacao peruano se caracteriza por su increíble diversidad genética. En la Amazonía peruana se han identificado más de 12 variedades de cacao nativo, muchas de ellas únicas en el mundo. Esta diversidad se traduce en una amplia gama de perfiles de sabor, desde notas florales y afrutadas hasta matices más intensos y complejos.</p>
    <h3>Variedades de Cacao Peruano</h3>
    <p>Las principales variedades de cacao cultivadas en el Perú incluyen el cacao Criollo, considerado el más fino y aromático; el cacao Amazónico, con sus notas frutales únicas; y el cacao Chuncho, originario del Cusco con un perfil especiado característico.</p>
    <p>La región de San Martín es actualmente la principal productora de cacao orgánico certificado del país, seguida por Cusco, Junín y Ayacucho. Cada una de estas regiones aporta características únicas al grano debido a sus condiciones climáticas y de suelo particulares.</p>
    <blockquote>
      "El cacao peruano no es solo un ingrediente, es un patrimonio cultural que debemos preservar y valorar. Cada grano cuenta la historia de nuestras tierras y de las familias que lo cultivan con dedicación."
    </blockquote>
    <p>En Chocolates Artesanales trabajamos directamente con productores locales para seleccionar los mejores granos de cacao, asegurando prácticas de comercio justo y sostenibilidad ambiental. Creemos firmemente que un chocolate excepcional solo puede elaborarse con materias primas excepcionales.</p>
    <p>Te invitamos a descubrir el sabor único del cacao peruano en cada uno de nuestros productos. Desde nuestras tabletas de chocolate oscuro 70% hasta nuestras trufas más exclusivas, cada bocado es un viaje a través de la rica tradición cacaotera del Perú.</p>`,
    image: 'assets/images/blog-1.jpg',
    author: 'Chef Carlos',
    authorAvatar: 'assets/images/author-1.jpg',
    authorBio: 'Maestro chocolatero con más de 15 años de experiencia. Apasionado por el cacao peruano y la innovación en chocolatería artesanal.',
    date: '15 Mayo, 2026',
    category: 'Historia',
    tags: ['cacao', 'perú', 'origen', 'variedades']
  };

  relatedPosts = [
    { id: 2, title: 'Cómo Degustar Chocolate como un Experto', slug: 'degustar-chocolate-experto', image: 'assets/images/blog-2.jpg', date: '10 May 2026', category: 'Consejos' },
    { id: 3, title: 'Beneficios del Chocolate Oscuro para la Salud', slug: 'beneficios-chocolate-oscuro', image: 'assets/images/blog-3.jpg', date: '5 May 2026', category: 'Salud' },
    { id: 6, title: 'El Proceso de Elaboración del Chocolate', slug: 'proceso-elaboracion-chocolate', image: 'assets/images/blog-6.jpg', date: '15 Abr 2026', category: 'Historia' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  shareOnFacebook(): void {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  }

  shareOnTwitter(): void {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(this.post.title)}`, '_blank');
  }

  shareOnWhatsApp(): void {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${this.post.title} - ${window.location.href}`)}`, '_blank');
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href);
  }
}
