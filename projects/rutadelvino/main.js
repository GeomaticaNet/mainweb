function init() {
	function e(e, o) {
		let a = document.querySelector(".active");
		(a.className = a.className.replace("active", "")), (o.className = "active");
		let g = r.getSource().getFeatures();
		if (
			(g.forEach(function (e) {
				e.setStyle(l);
			}),
				"Home" === o.id)
		)
			d.animate({ center: t }, { zoom: 7 }),
				(i.innerHTML = "Conoce las mejores bodegas de Mendoza"),
				s.setAttribute("src", "./data/Bodegas/ruta-del-vino.jpg"),
				(c.innerHTML =
					"Para adentrarse en el mundo del vino, desde la uva hasta la barrica, va aquí una selección de establecimientos que invitan a compartir sus secretos. Recorridos y degustaciones en los alrededores de la capital provincial y un poco más allá, en el Valle de Uco.");
		else {
			e.setStyle(n);
			let t = e.get("geometry").getCoordinates();
			d.animate({ center: t }, { zoom: 12 });
			let o = e.get("nombreBodega"),
				l = e.get("imagenBodega"),
				r = e.get("bodegaDescripcion");
			(i.innerHTML = o),
				s.setAttribute("src", "./data/Bodegas/" + l + ".jpg"),
				(c.innerHTML = r);
		}
	}
	const t = [-7605790.06, -4159397.33],
		o = new ol.Map({
			view: new ol.View({
				center: t,
				zoom: 7,
				minZoom: 7,
				maxZoom: 19,
				extent: [-8062536.39, -4529904.84, -7215053.68, -3744173.39],
				crossOrigin: "anonymous" // PONER ESTO SINO EN ALGUNOS NAVEGADORES NO FUNCA!.
			}),
			layers: [new ol.layer.Tile({
				source: new ol.source.BingMaps({
					key: "AnsfEb61jg2l8iQOCyiErlPhK7IrxaS3liMxHXDdmRlAed2OMuOeibJeA2X0f5np",
					imagerySet: "AerialWithLabelsOnDemand"
				}),
			})],
			controls: [],
			target: "openlayers-map",
		}),
		l = function (e) {
			let t = e.get("ID"),
				o = t.toString();
			const l = [
				new ol.style.Style({
					image: new ol.style.Circle({
						fill: new ol.style.Fill({ color: [77, 219, 105, 0.6] }),
						stroke: new ol.style.Stroke({ color: [6, 125, 34, 1], width: 1 }),
						radius: 10,
					}),
					text: new ol.style.Text({
						text: o,
						scale: 1.3,
						fill: new ol.style.Fill({ color: [232, 26, 26, 1] }),
						stroke: new ol.style.Stroke({
							color: [232, 26, 26, 1],
							width: 0.3,
						}),
					}),
				}),
			];
			return l;
		},
		n = function (e) {
			let t = e.get("ID"),
				o = t.toString();
			const l = [
				new ol.style.Style({
					image: new ol.style.Circle({
						fill: new ol.style.Fill({ color: [247, 26, 10, 0.5] }),
						stroke: new ol.style.Stroke({ color: [6, 125, 34, 1], width: 1 }),
						radius: 10,
					}),
					text: new ol.style.Text({
						text: o,
						scale: 1.3,
						fill: new ol.style.Fill({ color: [87, 9, 9, 1] }),
						stroke: new ol.style.Stroke({ color: [87, 9, 9, 1], width: 0.5 }),
					}),
				}),
			];
			return l;
		},
		r = new ol.layer.Vector({
			source: new ol.source.Vector({
				format: new ol.format.GeoJSON(),
				url: "./data/Bodegas/bodegas.geojson",
			}),
			style: l,
		});
	o.addLayer(r);
	const a = document.querySelector(".column-navigation"),
		i = document.getElementById("bodeganame"),
		s = document.getElementById("bodegaimage"),
		c = document.getElementById("bodegaDescripcion"),
		d = o.getView();
	o.on("singleclick", function (t) {
		o.forEachFeatureAtPixel(t.pixel, function (t, o) {
			let l = t.get("nombreBodega"),
				n = a.children.namedItem(l);
			e(t, n);
		});
	});
	const g = document.querySelectorAll(".column-navigation > a");
	for (let t of g)
		t.addEventListener("click", function (t) {
			let o = t.currentTarget,
				l = o.id,
				n = r.getSource().getFeatures();
			n.forEach(function (t) {
				let n = t.get("nombreBodega");
				l === n && e(t, o);
			}),
				"Home" === l && e(void 0, o);
		});
	const u = document.getElementById("popover-text"),
		m = new ol.Overlay({
			element: u,
			positioning: "bottom-center",
			stopEvent: !1,
		});
	o.addOverlay(m),
		o.on("pointermove", function (e) {
			let t = o.hasFeatureAtPixel(e.pixel);
			if (t) {
				let t = o.getFeaturesAtPixel(e.pixel),
					l = t[0].get("nombreBodega");
				m.setPosition(e.coordinate),
					(u.innerHTML = l),
					(o.getViewport().style.cursor = "pointer");
			} else m.setPosition(void 0), (o.getViewport().style.cursor = "");
		});
}
window.onload = init;
