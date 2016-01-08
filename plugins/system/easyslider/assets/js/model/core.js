void function( exports, $, _, Backbone ) {

	exports.ES_Model = B.Model;
	exports.ES_Collection = B.Collection;

	exports.ES_Origin = B.Model({
		x: 0,
		y: 0
	});
	exports.ES_Image = B.Model({

		alt: '',
		src: '',
		ratio: 1,
		width: 0,
		height: 0,

	},{
		initialize: function() {
			var self = this;
			this.on('change:src', function( src ) {
				var image = new Image;
				self.trigger('loadstart');
				image.onload = function() {
					self.set({
						width: this.width,
						height: this.height,
						ratio: this.width / this.height
					});
					self.trigger('load');
				}
				image.error = function() {
					console.warn('Failed to load image: ', this.src);
					self.set({
						width: 0,
						height: 0,
						ratio: 1
					});
					self.trigger('loaderror');
				}
				image.src = src;
			});
		},
	});
	exports.ES_Video = B.Model({

		autoplay: true,

		controls: false,
		loop: false,
		mute: false,

		volume: 100,
		speed: 1,

		youtube: null,
		vimeo: null,

		mp4: null,
		webm: null,
		ogg: null,

		ratio: 2.3,
		youtubeID: B.Compute(['youtube'], function(arg){
			if (arg) {
				var ID = arg.match(/v=([A-Za-z0-9|-]+)/)
				if(ID) {
					return ID[1];
				}
			}
			return null;
		}),
		vimeoID: B.Compute(['vimeo'], function(arg){
			if ( arg) {
				var ID = arg.match(/([0-9]+)/);
				if( ID) {
					return ID[1];
				}
			}
			return null;
		})
		//ratio: 0,
	},{
		initialize: function() {
			this.on('change:youtube', this.onChangeVideo);
			this.on('change:vimeo', this.onChangeVideo);
		},
		onChangeVideo: function(){
			var view = this;
			//console.log(this.parent)
			var youtubeID = this.get('youtubeID');
			//console.log(youtubeID)
			if ( youtubeID ){
				//console.log('co youtube')
				this.parent.set('image.src', 'http://img.youtube.com/vi/' + youtubeID + '/1.jpg');
				return;
			}

			var vimeoID = this.get('vimeoID');
			//console.log(vimeoID)
			if ( vimeoID ) {
				//console.log('co vimeo')
				$.getJSON('http://www.vimeo.com/api/v2/video/' + vimeoID + '.json?callback=?', {format: "json"}, function(data) {
					view.parent.set('image.src', data[0].thumbnail_large)
				});
				return;
			}
			this.parent.set('image.src', ' ');
			this.parent.set('color', '#000000');

		},
	});
	exports.ES_Gradient = B.Model({
		type: 'linear',
		angle: 0,
		from: '#000000',
		to: '#000000'
	});
	exports.ES_Background = B.Model({
		color: '',
		image: ES_Image,
		video: ES_Video,
		gradient: ES_Gradient,
		repeat: true,
		position: 'center',
		size: 'cover',

		parallax_depth: 0.5,

		kenburn: B.Model({
			enable: false,
			from: B.Model({ x: 0, y: 0, scale: 1, rotate: 0 }),
			to: B.Model({ x: 0, y: 0, scale: 1, rotate: 0 }),
			easing: 'linear',
			duration: 10000
		}),
		localVideo: B.Compute(function() {
			return this.get('video.mp4') || this.get('video.ogg') || this.get('video.webm') ? true : false;
		})
	});
	exports.ES_Attributes = B.Model({
		'id': '',
		'class': '',
		'href': '',
		'target': ''
	});
	exports.ES_FontsCollection = B.Collection([
		B.Model({
			name: 'Font Group',
			fonts: B.Collection([
				B.Model({ name: 'Font Name' })
			])
		})
	],{
		constructor: function ES_FontsCollection() {
			B.Collection.call(this, this.constructor.presets)
		}
	},{
		presets: [
			{
				name: "Sans Serif",
				fonts: [ { "name": "Open Sans" }, { "name": "Roboto" }, { "name": "Lato" }, { "name": "Oswald" }, { "name": "Roboto Condensed" }, { "name": "Source Sans Pro" }, { "name": "PT Sans" }, { "name": "Droid Sans" }, { "name": "Raleway" }, { "name": "Montserrat" }, { "name": "Ubuntu" }, { "name": "PT Sans Narrow" }, { "name": "Arimo" }, { "name": "Titillium Web" }, { "name": "Dosis" }, { "name": "Oxygen" }, { "name": "Hind" }, { "name": "Muli" }, { "name": "Fira Sans" }, { "name": "Play" }, { "name": "Signika" }, { "name": "Merriweather Sans" }, { "name": "Josefin Sans" }, { "name": "Archivo Narrow" }, { "name": "Archivo Black" }, { "name": "Exo 2" }, { "name": "Asap" }, { "name": "Karla" }, { "name": "Orbitron" }, { "name": "Quicksand" }, { "name": "Exo" }, { "name": "Ropa Sans" }, { "name": "Cabin Condensed" }, { "name": "Hammersmith One" }, { "name": "Jura" }, { "name": "Russo One" }, { "name": "Rambla" }, { "name": "Chivo" }, { "name": "Viga" }, { "name": "Rajdhani" }, { "name": "Teko" }, { "name": "Cambay" }, { "name": "Sarpanch" }, { "name": "Poppins" }, { "name": "NTR" }, { "name": "Yantramanav" }, { "name": "Jaldi" }, { "name": "Pragati Narrow" } ]
			},
			{
				name: "Serif",
				fonts: [ { "name": "Lora" }, { "name": "Droid Serif" }, { "name": "Roboto Slab" }, { "name": "Merriweather" }, { "name": "Kadwa" }, { "name": "Sumana" }, { "name": "Martel" }, { "name": "Suranna" }, { "name": "Sree Krushnadevaraya" }, { "name": "Rozha One" }, { "name": "Vesper Libre" }, { "name": "Almendra" }, { "name": "Karma" }, { "name": "Stoke" }, { "name": "Inika" }, { "name": "Slabo 13px" }, { "name": "Rufina" }, { "name": "Tienne" }, { "name": "Podkova" }, { "name": "Judson" }, { "name": "Oranienbaum" }, { "name": "Prata" }, { "name": "Adamina" }, { "name": "Arapey" }, { "name": "Copse" }, { "name": "Alice" }, { "name": "Coustard" }, { "name": "Neuton" }, { "name": "Ultra" }, { "name": "Glegoo" }, { "name": "Cantata One" }, { "name": "Vidaloka" }, { "name": "Enriqueta" }, { "name": "Playfair Display SC" }, { "name": "Kreon" }, { "name": "Old Standard TT" }, { "name": "Josefin Slab" }, { "name": "Sanchez" }, { "name": "Noticia Text" }, { "name": "Crete Round" }, { "name": "Rokkitt" }, { "name": "Bree Serif" }, { "name": "Arvo" }, { "name": "Playfair Display" }, { "name": "Bitter" } ]
			},
			{
				name: "Display",
				fonts: [ { "name": "Lobster" }, { "name": "Abril Fatface" }, { "name": "Patua One" }, { "name": "Lobster Two" }, { "name": "Bangers" }, { "name": "Fredoka One" }, { "name": "Alfa Slab One" }, { "name": "Passion One" }, { "name": "Righteous" }, { "name": "Playball" }, { "name": "Fugaz One" }, { "name": "Squada One" }, { "name": "Bevan" }, { "name": "Oleo Script" }, { "name": "Contrail One" }, { "name": "Monoton" }, { "name": "Sansita One" }, { "name": "Ceviche One" }, { "name": "Unica One" }, { "name": "Seaweed Script" }, { "name": "Kelly Slab" }, { "name": "Yeseva One" }, { "name": "Oleo Script Swash Caps" }, { "name": "Graduate" }, { "name": "Trade Winds" }, { "name": "Medula One" }, { "name": "Sancreek" }, { "name": "Rye" }, { "name": "Geostar Fill" }, { "name": "Geostar" }, { "name": "Ewert" }, { "name": "Metal Mania" }, { "name": "Faster One" }, { "name": "Ranga" } ]
			},
			{
				name: "Hand-writing",
				fonts: [ { "name": "Romanesco" }, { "name": "Mrs Saint Delafield" }, { "name": "Aguafina Script" }, { "name": "Herr Von Muellerhoff" }, { "name": "Yesteryear" }, { "name": "Yellowtail" }, { "name": "Grand Hotel" }, { "name": "Allura" }, { "name": "Nothing You Could Do" }, { "name": "Great Vibes" }, { "name": "Kaushan Script" } ]
			},
			{
				name: "Monospace",
				fonts: [ { "name": "Roboto Mono" }, { "name": "Cutive Mono" }, { "name": "PT Mono" }, { "name": "Ubuntu Mono" }, { "name": "Source Code Pro" }, { "name": "Inconsolata" } ]
			}
		]
	})
	exports.ES_Fonts = B.Collection.extend( {
		model: B.Model.extend({
			defaults: {
				name: '',
				loaded: false,
				system: false
			},
			load: function() {
				if (!this.get('loaded') && !this.get('system')){
					this.set('loaded', true);
					$( 'body' ).append( "<link href='//fonts.googleapis.com/css?family=" + this.get( 'name' ).replace( /\s+/g, '+' ) + "' rel='stylesheet' data-noprefix type='text/css'>" )
				}
			}
		}),
		constructor: function() {
			var fonts = [];
			_.each(ES_FontsCollection.presets, function(group) {
				_.each(group.fonts, function( font ) {
					fonts.push({ name: font.name, group: group.name });
				});
			});
			B.Collection.call(this,fonts);
		},
		load: function( name ) {
			_( this.where({ name: name }) ).invoke('load');
		}
	});
	exports.ES_Nav = B.Collection.extend({

	},{
		templates: {
			'slide': {
				prev: '<span class="es-icon-wrap"><svg class="es-icon" width="32" height="32" viewBox="0 0 64 64"><use xlink:href="#arrow-left-1"></svg></span> ' +
						'<div><h3 class="es-name"></h3><img /></div>',
				next: '<span class="es-icon-wrap"><svg class="es-icon" width="32" height="32" viewBox="0 0 64 64"><use xlink:href="#arrow-right-1"></svg></span> ' +
						'<div><h3 class="es-name"></h3><img /></div>',
			},
			'fillpath': {
				prev: '<span class="es-icon-wrap"></span><h3><strong class="es-name">Prev</strong><span></span></h3>',
				next: '<span class="es-icon-wrap"></span><h3><strong class="es-name">Next</strong><span></span></h3>',
			},
			'circlepop': {
				prev: '<span class="es-icon-wrap"></span>',
				next: '<span class="es-icon-wrap"></span>',
			},
			'roundslide': {
				prev: '<span class="es-icon-wrap"><svg class="es-icon" width="32" height="32" viewBox="0 0 64 64"><use xlink:href="#arrow-left-4"></svg></span> ' +
						'<h3 class="es-name">Hannah Leigh</h3>',
				next: '<span class="es-icon-wrap"><svg class="es-icon" width="32" height="32" viewBox="0 0 64 64"><use xlink:href="#arrow-right-4"></svg></span> ' +
						'<h3 class="es-name">Greg Kennedy</h3>',
			},
			'slit': {
				prev: '<span class="es-icon-wrap"><svg class="es-icon" width="22" height="22" viewBox="0 0 64 64"><use xlink:href="#arrow-left-1"></svg></span> ' +
						'<div><h3 class="es-name">City Lights</h3><img /></div>',
				next: '<span class="es-icon-wrap"><svg class="es-icon" width="22" height="22" viewBox="0 0 64 64"><use xlink:href="#arrow-right-1"></svg></span> ' +
						'<div><h3 class="es-name">City Lights</h3><img /></div>',
			},
			'thumbflip': {
				prev: '<span class="es-icon-wrap"><svg class="es-icon" width="32" height="32" viewBox="0 0 64 64"><use xlink:href="#arrow-left-5"></svg></span> <img />',
				next: '<span class="es-icon-wrap"><svg class="es-icon" width="32" height="32" viewBox="0 0 64 64"><use xlink:href="#arrow-right-5"></svg></span> <img />',
			},
			'name': {
				prev: '',
				next: '',
			},
			'name': {
				prev: '',
				next: '',
			},
			'name': {
				prev: '',
				next: '',
			},
			'name': {
				prev: '',
				next: '',
			},
		}
	})

}( this, jQuery, _, JSNES_Backbone );