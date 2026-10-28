// Asegurar que jQuery esté disponible antes de ejecutar
if (typeof $ !== "undefined") {
  $(function () {
    // ── 1. .on() ES LA FORMA ÚNICA ──────────────────────────────────────────
    $("#menu-toggle").on("click", function () {
      const $menu = $("#menu-movil");

      $menu.slideToggle(200);

      const abierto = $(this).attr("aria-expanded") === "true";
      $(this).attr("aria-expanded", String(!abierto));
    });

    // ── 2. DELEGACIÓN, EN UNA LÍNEA ─────────────────────────────────────────
    $("#acordeon").on("click", ".titulo", function () {
      const $titulo = $(this);
      const $cuerpo = $titulo.next(".cuerpo");

      $cuerpo.stop(true, true).slideToggle(200);

      const expandido = $titulo.attr("aria-expanded") === "true";
      $titulo.attr("aria-expanded", String(!expandido));

      $("#acordeon .cuerpo").not($cuerpo).stop(true, true).slideUp(200);
      $("#acordeon .titulo").not($titulo).attr("aria-expanded", "false");
    });

    // ── 3. LOS EFECTOS ──────────────────────────────────────────────────────

    // ── 4. .each() Y EL ESCALONADO ──────────────────────────────────────────
    let avisosVisibles = false;
    $("#mostrar-avisos").on("click", function () {
      avisosVisibles = !avisosVisibles;
      const $boton = $(this);

      if (avisosVisibles) {
        $("#avisos li").each(function (indice) {
          $(this).stop(true, true).delay(indice * 120).fadeIn(250);
        });
        $boton.text("Ocultar avisos");
      } else {
        $("#avisos li").stop(true, true).fadeOut(200);
        $boton.text("Mostrar avisos");
      }
    });

    // ── 5. .animate(), PARA LO QUE NO CUBRE UN EFECTO ───────────────────────
    $("#panel h2").on("mouseenter", function () {
      $(this).stop().animate({ paddingLeft: "8px" }, 150);
    }).on("mouseleave", function () {
      $(this).stop().animate({ paddingLeft: "0px" }, 150);
    });

    // ── 6. UNA FUNCIÓN PROPIA QUE DEVUELVE LA SELECCIÓN ─────────────────────
    function resaltar($seleccion, milisegundos = 1200) {
      $seleccion.addClass("resaltado");
      setTimeout(() => $seleccion.removeClass("resaltado"), milisegundos);
      return $seleccion;
    }

    resaltar($("#panel h2")).css("letter-spacing", "0.5px");
  });
}

