import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent implements OnInit {
  imprint = [
    {
      header: 'CheckCars24 GmbH',
      paragraphs: ['Mahlower Str. 235', '    14513 Teltow'],
      icon: 'map-pin-line',
    },
    {
      header: 'Haftung',
      paragraphs: [
        `Die Inhalte dieser Informationsseite werden mit größtmöglicher Sorgfalt
         erstellt. Die Firma CheckCars24 GmbH übernimmt jedoch keine Gewähr für
         die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten
         Inhalte. Die Nutzung der abrufbaren Inhalte erfolgt auf eigene Gefahr
         des Nutzers.`,
      ],
      icon: 'service-line',
    },
    {
      header: ' Geschäftsführer',
      paragraphs: [
        `Tolgahan Mazur`,
        'Tel.: 03328 33 17 277',
        'Fax:03328 33 17 272',
        'E-Mail: info@checkcars24.de',
      ],
      icon: 'user-2',
    },
    {
      header: 'Externe Links',
      paragraphs: [
        `Diese Informationsseite kann Verknüpfungen zu anderen Websites
         enthalten. Trotz sorgfältiger Überprüfung auf etwaige Rechtsverstöße,
         übernimmt die Firma CheckCars24 GmbH keine Haftung. Die verlinkten Webseiten
         unterliegen der Haftung der jeweiligen Betreiber. Bei Kenntnis von Rechtsverstößen
         werden derartige externe Links unverzüglich gelöscht.`,
      ],
      icon: 'external-link-line',
    },
    {
      header: 'Sitz der Gesellschaft:',
      paragraphs: [`Teltow`, '  HRB 30973 P / Amtsgericht Potsdam'],
      icon: 'road-map-line',
    },

    {
      header: 'Ust. IdNr.:',
      paragraphs: [`DE306734703`],
      icon: 'user-2-line',
    },
    {
      header:
        'Inhaltlich Verantwortlicher im Sinne der §§ 5, 6 TMG (Telemediengesetz):',
      paragraphs: [`CheckCars24 GmbH (Anschrift wie oben)`],
      icon: 'book-open-fill',
    },
    {
      header: 'Bildnachweise:',
      paragraphs: [`CheckCars24.de Bildrechte`],
      icon: 'image-line',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
