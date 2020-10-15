/*imports*/
import React from "react";
import {
  SliderInput,
  SliderTrack,
  SliderTrackHighlight,
  SliderHandle
} from "@reach/slider";
import "@reach/slider/styles.css";
import ReactPlayer from "react-player";
import { pdfjs } from "react-pdf";
import Typekit from "react-typekit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeOff, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import mapboxgl from "mapbox-gl";
import SinglePagePDFViewer from "./single-page";
import { sampleBase64pdf } from "./nThesisBase64pdf";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibm5pa2l0YSIsImEiOiJjazdtYzV2MDYwMzliM2dubnVubnJuMTRrIn0.6KqRhtWgMc_nGwMPAqmstQ";

/*Main Class*/
class Application extends React.Component {
  /*Constructor*/
  constructor(props) {
    super(props);
    this.state = {
      mapHeight: window.innerHeight,
      mapWidth: window.innerWidth,
      lng: 78.4735,
      lat: 17.375,
      value: 50,
      index: true,
      aboutState: true,
      glossaryState: true,
      aboutWidth: 0,
      glossaryWidth: 0,
      researchState: true,
      researchWidth: 0,
      researchBorder: 0,
      legendState: false,
      legendHeight: "15%",
      squareText: "",
      circleText: "",
      videoHeight: 0.4 * window.innerHeight,
      videoWidth: 0.4 * window.innerWidth,
      imageDimX1: 0,
      imageZindex1: 1,
      popUp: false,
      popUpX: 0,
      popUpY: 0,
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0,
      popUpColor: "",
      scaleDistance: 13,
      page1Vis: "visible",
      page2Vis: "hidden",
      page3Vis: "hidden",
      page4Vis: "hidden",
      page5Vis: "hidden",
      page6Vis: "hidden",
      page7Vis: "hidden",
      page8Vis: "hidden",
      page1Play: true,
      volumeIcon: faVolumeOff,
      page1mute: true,
      theme3DescTop: window.innerHeight / 4,
      theme3VidTop: window.innerHeight / 4
    };
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/build/pdf.worker.js`;
    /*Bind Functions*/
    this.researchRef = React.createRef();
    this.aboutRef = React.createRef();
    this.legendRef = React.createRef();
    this.glossaryRef = React.createRef();
    this.video1Ref = React.createRef();
    this.video2Ref = React.createRef();
    this.video3Ref = React.createRef();
    this.video4Ref = React.createRef();
    this.video5Ref = React.createRef();
    this.video6Ref = React.createRef();
    this.video7Ref = React.createRef();
    this.video8Ref = React.createRef();
    this.indexFunction = this.indexFunction.bind(this);
    this.handleAboutResearchClick = this.handleAboutResearchClick.bind(this);
    this.circleFunction = this.circleFunction.bind(this);
    this.circleFunctionDown = this.circleFunctionDown.bind(this);
    this.triangleFunction = this.triangleFunction.bind(this);
    this.aboutFunction = this.aboutFunction.bind(this);
    this.glossaryFunction = this.glossaryFunction.bind(this);
    this.researchFunction = this.researchFunction.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.muteFunction = this.muteFunction.bind(this);
    this.researchURL = this.researchURL.bind(this);

    /*Text Variables*/
    this.aboutText =
      "Goods, Gods and Goddesses alternates performances with moments of their making. In portraying the market, Begum Bazar, and the many goods, gods and goddesses that move this space, I am looking, seeking but also escaping what I’ve been rummaging. These are individual segments, fragments of a whole, a whole I may never conceive. Because the thing is, in the telling of the various parts that will build this whole, I’m left with impressions of acts about acts, of scripted acts and scripting acts, of directing in the Bazar and being directed by the Bazar, of watching people perform with intermittent awareness of my own performance. Here, bodies become, a bride, a mother, a devotee, a woman. Stores advertise wholesale deals, actors play multiple parts, wholesale roles. It is a patch of land, but a theatre, with rehearsals, scripts and episodic memories keeping gender desirable, as imagined by some, exacted and ordered, with its outlines defined, insides determined, and borders enforced.";
    this.aboutReferenceText =
      "I do not own the copyright to this video and some of the phrases from the article above. The use of these is purely for non-profit educational and research purposes.";
    this.aboutTools = "Mapbox, Google Maps";
    this.aboutFonts = "Ballinger Mono, Kazimir Text";
    this.aboutDowry =
      "Goods, money, or property that a bride brings to her husband and his family during a wedding. In India, even after being outlawed, dowry is often demanded by the husband or his family. A practice that has been cited as a cause for about forty five percent of all homicides against women in India.";
    this.aboutBangles =
      "Delicate traditional circular ornaments for wrists, usually worn by women and made with glass.";
    this.aboutGanga =
      "One of the longest rivers in India. Considered sacred and worshipped as a goddess by people of the Hindu faith. Also a common name for a woman in India.";
    this.aboutAshirwad = "A word of Sanskrit origin which means a blessing.";
    this.aboutAnnapurna =
      "Sanskrit name of the goddess for food and nourishment in Hindu mythology. Also a common name for a woman in India.";
      this.aboutImam =
      "A Muezzin, who calls muslims to prayer from the minaret of a mosque. He leads the call (adhan or Azan) to Friday service and the five daily prayers from one of the mosque's minarets and Imam is the title given to the person who leads prayers at a mosque.";
      this.aboutAzan =
      "A Muslim call to prayer that is said five times a day, usually from a minaret or a mosque.";
      this.aboutTelangana =
      "State in southern India.";
      this.aboutIndia =
      "The political climate in India since 2019 is dominated by the return to Government of Narendra Modi’s Hindu Nationalist party, the Bharatiya Janata Party (BJP). His Government has since introduced many controversial laws, including a Citizenship Amendment Act, which have increased the sense of fear among the Indian Muslims. Since 2014, when Modi first came to power, India has seen an increase in religious violence against Muslims.";
    this.aboutBazar =
      "A local marketplace or a street with stores, both permanent and makeshift.";

    this.theme0Desc =
      "The opening act set in the market scene, outside of the stores with their own smaller acts, is the longest one. It starts at about 10 AM, when the first actors, men, all playing storekeepers gradually enter the scene with women following after. About an hour before noon, the set is full, with all actors, occupying their respective positions. Smaller acts include men and women crossing streets, with women walking past stores in groups. Some actors are to walk with stage directions from google reviews. Others are to act from memory and the nostalgia of a previous act. The vital, perhaps the most challenging part is to co-ordinate the whole scene while the traffic moves as usual along the jagged lanes. The actors, the stores, the space, the traffic, the honking, all merge together, composing, enacting and reenacting. Each corner of the market concentrates on recreating different moments through different acts.";
    this.theme1Desc =
      "I’ve laid out the scenes now, to arrange them, find an order, a cause and effect, the hero and the anti-hero and discern the rehearsal from the act, the actor from the director, the stage from the ground, to sift memories from scripts and index this audience at once synchronized and performing.";
    this.theme2Desc =
      "If nostalgia was the story, would it tell itself? But what if in its rare retelling, those images, objects, sounds and dialogues whose summoning this involves, tells you something else, a story in its multiple digressions, where objects that initially appear like gift shop souvenirs of past, mass manufactured shapes of collective memories, but instead turn out to be just flotsam. And in its salvage, you’re partially pressed between what you felt then and what you know now.";
    this.theme3Desc =
      "This thesis looks at an urban market, Begum Bazar situated in the old city of Hyderabad and its relation to gender. The work, initially set out to explore kitchen objects and their place in shaping one’s life, eventually becomes an exploration into how, space and gender narratives co-exist and help sustain each other. By using the example of this market situated in a major metropolitan Indian city, and through interviews of people occupying and visiting the space, the work speculates on how social hierarchies and practices gain ground.";
    this.theme3Desc1 = "Dear Common Good,";
    this.theme3Desc2 =
      "I’m a designer, currently working on a short film. I have for the longest time followed your chief executive, Mr. Siddharth Gupta and his irrefutable take on naming brands.";
    this.theme3Desc3 =
      "I particularly identify with his naming of the Ganga pressure cooker; my friend’s mother had the same name and we were close friends. My friend, when she got married, also received an entire Ganga cooking range as a wedding gift. I believe, the groom’s family were quite particular about what gifts they wanted. And me, I’ve never taken a meal without bread made from the wheat flour, Annapurna. As best as I can remember, I did not have a friend by this name, though, my grandmother, a devout lady, prayed without end to the goddess, Annapurna.";
    this.theme3Desc4 =
      "Mr. Gupta is a revered Ad Man, and I’d love to have him sit for a talk. This interview, I strongly believe, will put the rest of the plot into perspective.";
    this.page4Desc =
      "The other thing is the picture of the child, who remained as a sample on the storekeeper’s phone, a sample of this set and its screenplay. And while recording, I knew that it was precisely at this moment in my narrative sequence that rage and anger should summit. But then again, what is the cost of manufacturing this rage and to what end?";
    this.page5Desc =
      "And what of the bride, who reaches her marital home with utensils filled to their brim with grains, evidence of having received good care or upbringing (likely one of those)? Do we see these utensils in the frame? Should we see them? Close-ups, stills or do we see them as they are emptied by those in this home? Utensils filled with grain, gradually emptied. Must we see this to understand the story? ";
    this.page7Desc =
      "Also consider that instance of the patriarch, who in his insistence about the relevance of dowry, keeps mentioning the many movies he’s seen. In what had felt like being consumed by sharp moments of hesitations and illusions about beginnings, middles and ends, watching his faith in fiction, there were for me, brief flashes of deep belief. That I could tell a counter story, however disjointed. That eventually, I might find a form, a way to narrate these, connect instances of fear to power and identities to authority.";

    this.page6Desc =
      "The question is, why does the muezzin suddenly follow up his recital with a declaration of his love for India? Or was it a plea? A plea far too big, a distance too remote for this neighborhood minaret to broadcast. And I had been looking for a face, a face most depicting of this fear. But for now, I will have to organize and find within this sound those precise points of nostalgia, power and fear.";
  }
  /* Video URLs*/
  theme0Video = "https://player.vimeo.com/video/467182611";
  theme1Video = "https://vimeo.com/448630508/11ec6d4d54";
  theme2Video = "https://vimeo.com/448632066/2ab228f98c";
  theme3Video = "https://vimeo.com/448631543/98f339b864";
  theme4Video = "https://player.vimeo.com/video/468048345";
  theme5Video = "https://vimeo.com/448795035/00689831b4";
  theme6Video = "https://vimeo.com/448630300/810e46cfce";
  theme7Video = "https://vimeo.com/454107513/7c4b053989";

  /* Legend colors */
  godsColor = "#79859a";
  godsStoreColor = "#6999a4";
  restoColor = "#37482b";
  bnwColor = "#355b75";
  kitchenColor = "#75492f";
  groceryColor = "#c2b89e";
  toysColor = "#4971a2";
  plasticColor = "#8f7f56";
  barsColor = "#57858e";

  /* Theme Position Variables*/
  circleState = 0;
  maxThemes = 7;
  triangleState = false;
  themeDescLeft = 0.6 * window.innerWidth;
  themeDescWidth = 0.35 * window.innerWidth;
  themeVidLeft = 65;
  themeTop = 0.2 * window.innerHeight;

  /*On Mount*/
  componentDidMount() {
    /*Update Dimenstions based on screen size*/
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    /*Initiate Map*/
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/nnikita/ckd7n4m5b04e31ip8ai5a1xfj",
      center: [this.state.lng, this.state.lat],
      zoom: 20,
      pitch: 60,
      bearing: 110,
      attributionControl: false,
      interactive: false
    });
    /*Map Functions*/
    this.map.scrollZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.dragPan.enable();
    var deltaDistance = 100;
    var deltaDegrees = 10;
    function easing(t) {
      return t * (2 - t);
    }
    /*Map- Game Controls*/
    this.map.on("load", () => {
      this.map.getCanvas().focus();
      window.addEventListener(
        "keydown",
        e => {
          e.preventDefault();
          if (e.which === 38) {
            // up
            this.map.panBy([0, -deltaDistance], {
              easing: easing
            });
          } else if (e.which === 40) {
            // down
            this.map.panBy([0, deltaDistance], {
              easing: easing
            });
          } else if (e.which === 37) {
            // left
            this.map.easeTo({
              bearing: this.map.getBearing() - deltaDegrees,
              easing: easing
            });
          } else if (e.which === 39) {
            // right
            this.map.easeTo({
              bearing: this.map.getBearing() + deltaDegrees,
              easing: easing
            });
          }
        },
        true
      );
    });
    /*Map - Dots PopUp*/
    this.map.on("mousemove", e => {
      var pageX = window.event.pageX - window.scrollX;
      var pageY = window.event.pageY - window.scrollY;
      var features = this.map.queryRenderedFeatures(e.point, {
        layers: ["gods"]
      });
      if (features.length) {
        this.setState({
          pointName: features[0].properties.Name,
          layerName: "Place of Worship",
          popUpX: pageX,
          popUpY: pageY,
          popUpH: 500,
          popUpW: 500,
          popUpPad: 3,
          popUpColor: this.godsColor
        });
      } else {
        features = this.map.queryRenderedFeatures(e.point, {
          layers: ["gods-stores"]
        });
        if (features.length) {
          this.setState({
            pointName: features[0].properties.Name,
            layerName: "Religious Store",
            popUpX: pageX,
            popUpY: pageY,
            popUpH: 500,
            popUpW: 500,
            popUpPad: 3,
            popUpColor: this.godsStoreColor
          });
        } else {
          features = this.map.queryRenderedFeatures(e.point, {
            layers: ["restaurant"]
          });
          if (features.length) {
            this.setState({
              pointName: features[0].properties.Name,
              layerName: "Restaurant",
              popUpX: pageX,
              popUpY: pageY,
              popUpH: 500,
              popUpW: 500,
              popUpPad: 3,
              popUpColor: this.restoColor
            });
          } else {
            features = this.map.queryRenderedFeatures(e.point, {
              layers: ["beauty-and-wedding"]
            });
            if (features.length) {
              this.setState({
                pointName: features[0].properties.Name,
                layerName: "Beauty and Wedding Store",
                popUpX: pageX,
                popUpY: pageY,
                popUpH: 500,
                popUpW: 500,
                popUpPad: 3,
                popUpColor: this.bnwColor
              });
            } else {
              features = this.map.queryRenderedFeatures(e.point, {
                layers: ["kitchen-utensils"]
              });
              if (features.length) {
                this.setState({
                  pointName: features[0].properties.Name,
                  layerName: "Kitchen Utensils Store",
                  popUpX: pageX,
                  popUpY: pageY,
                  popUpH: 500,
                  popUpW: 500,
                  popUpPad: 3,
                  popUpColor: this.kitchenColor
                });
              } else {
                features = this.map.queryRenderedFeatures(e.point, {
                  layers: ["grocery-stores"]
                });
                if (features.length) {
                  this.setState({
                    pointName: features[0].properties.Name,
                    layerName: "Grocery Store",
                    popUpX: pageX,
                    popUpY: pageY,
                    popUpH: 500,
                    popUpW: 500,
                    popUpPad: 3,
                    popUpColor: this.groceryColor
                  });
                } else {
                  features = this.map.queryRenderedFeatures(e.point, {
                    layers: ["toys-stores"]
                  });
                  if (features.length) {
                    this.setState({
                      pointName: features[0].properties.Name,
                      layerName: "Toys Store",
                      popUpX: pageX,
                      popUpY: pageY,
                      popUpH: 500,
                      popUpW: 500,
                      popUpPad: 3,
                      popUpColor: this.toysColor
                    });
                  } else {
                    features = this.map.queryRenderedFeatures(e.point, {
                      layers: ["plastic-goods-stores"]
                    });
                    if (features.length) {
                      this.setState({
                        pointName: features[0].properties.Name,
                        layerName: "Plastic Goods Store",
                        popUpX: pageX,
                        popUpY: pageY,
                        popUpH: 500,
                        popUpW: 500,
                        popUpPad: 3,
                        popUpColor: this.plasticColor
                      });
                    } else {
                      features = this.map.queryRenderedFeatures(e.point, {
                        layers: ["bars-and-liquor"]
                      });
                      if (features.length) {
                        this.setState({
                          pointName: features[0].properties.Name,
                          layerName: "Bar and Liquor Store",
                          popUpX: pageX,
                          popUpY: pageY,
                          popUpH: 500,
                          popUpW: 500,
                          popUpPad: 3,
                          popUpColor: this.barsColor
                        });
                      } else {
                        this.setState({
                          popUpH: 0,
                          popUpW: 0,
                          pointName: "",
                          layerName: "",
                          popUpPad: 0,
                          popUpColor: ""
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    /*Map - Reset PopUps on Drag*/
    this.map.on("drag", () => {
      this.setState({
        popUpH: 0,
        popUpW: 0,
        pointName: "",
        layerName: "",
        popUpPad: 0
      });
    });
    /*Map - Cursor Style*/
    this.map.getCanvas().style.cursor = "all-scroll";
    /*Map - Reset location on move*/
    this.map.on("move", () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2),
        popUpH: 0,
        popUpW: 0,
        pointName: "",
        layerName: "",
        popUpPad: 0
      });
    });
    /*Map - Change Cursor Style when hover over dots*/
    /*   this.map.on("mousemove", e => {
      // Set variables equal to the current feature's magnitude, location, and time
      var hoverFeatures = this.map.queryRenderedFeatures(e.point, {
        layers: [
          "gods",
          "gods-stores",
          "restaurant",
          "beauty-and-wedding",
          "kitchen-utensils",
          "grocery-stores",
          "toys-stores",
          "plastic-goods-stores",
          "bars-and-liquor"
        ]
      });
      // Check whether features exist
      if (hoverFeatures.length > 0) {
        this.map.getCanvas().style.cursor = "pointer";
      } else {
        this.map.getCanvas().style.cursor = "all-scroll";
      }
    });*/
    /*Remove PopUp when clicked on About, Research, or Legend windows*/
    window.addEventListener("mousedown", this.handleAboutResearchClick);
    this.researchURL();
  }

  muteFunction() {
    if (this.state.page1mute == true) {
      this.setState({ volumeIcon: faVolumeUp, page1mute: false });
    } else {
      this.setState({ volumeIcon: faVolumeOff, page1mute: true });
    }
  }

  /*When clicked on Home Button*/
  indexFunction() {
    this.setState({
      aboutState: true,
      glossaryState: true,
      researchState: true,
      legendState: true
    });
    let pathWithoutTheQuery = window.location.pathname;
    window.location.replace(pathWithoutTheQuery);
  }

  /*Function to Update dimensions*/
  updateDimensions() {
    if (window.innerWidth >= window.innerHeight) {
      this.setState({
        mapWidth: window.innerWidth,
        mapHeight: (9 * window.innerWidth) / 16
      });
    } else {
      this.setState({
        mapHeight: window.innerHeight,
        mapWidth: (16 * window.innerHeight) / 9
      });
    }
  }

  /*Function to remove popups when clicked inside About, Research, or Legend windows*/
  handleAboutResearchClick(event) {
    if (
      this.aboutRef.current.contains(event.target) ||
      this.researchRef.current.contains(event.target) ||
      this.legendRef.current.contains(event.target)
    ) {
      this.setState({
        popUpH: 0,
        popUpW: 0,
        pointName: "",
        layerName: "",
        popUpPad: 0
      });
    }
  }
  /*When clicked on About button*/
  aboutFunction() {
    this.setState(prevState => ({
      aboutState: !prevState.aboutState
    }));
    this.setState({
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    if (this.state.researchState == false) {
      this.setState({ researchWidth: 0, researchState: true });
    }
    if (this.state.glossaryState == false) {
      this.setState({ glossaryWidth: 0, glossaryState: true });
    }
    if (this.state.legendState == false) {
      this.setState({ legendHeight: 0, legendState: true });
    }
    if (this.state.aboutState == true) {
      this.setState({
        aboutWidth: "40.5%"
      });
    }   
    else {
      this.setState({
        aboutWidth: 0,
        legendHeight: "15%",
        legendState: false
      });
    }
  }
  /*When clicked on Legend button*/
  glossaryFunction() {
    this.setState(prevState => ({
      glossaryState: !prevState.glossaryState
    }));
    this.setState({
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    if (this.state.researchState == false) {
      this.setState({ researchWidth: 0, researchState: true });
    }
    if (this.state.legendState == false) {
      this.setState({ legendHeight: 0, legendState: true });
    }
    if (this.state.aboutState == false) {
      this.setState({ aboutWidth: 0, aboutState: true });
    }    
    if (this.state.glossaryState == true) {
      this.setState({
        glossaryWidth: "40.5%"
      });
    }   
    else {
      this.setState({
        glossaryWidth: 0,
        legendHeight: "15%",
        legendState: false
      });
    }
  }
  /*When clicked on Research button*/
  researchFunction() {
    this.setState(prevState => ({
      researchState: !prevState.researchState
    }));
    this.setState({
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    if (this.state.aboutState == false) {
      this.setState({ aboutWidth: 0, aboutState: true });
    }
    if (this.state.glossaryState == false) {
      this.setState({ glossaryWidth: 0, glossaryState: true });
    }    
    if (this.state.legendState == false) {
      this.setState({ legendHeight: 0, legendState: true });
    }
    if (this.state.researchState == true) {
      this.setState({
        researchWidth: "40.5%",
        researchBorder: 50
      });
    } else {
      this.setState({
        researchWidth: 0,
        researchBorder: 0,
        legendHeight: "15%",
        legendState: false
      });
    }
  }
  /*When clicked on Next button*/
  circleFunction() {
    this.setState({
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    this.triangleState = false;
    if (this.circleState > this.maxThemes - 1) {
      this.circleState = 0;
    } else {
      this.circleState += 1;
    }
    if (this.circleState == 0) {
      this.setState({
        page1Vis: "visible",
        page8Vis: "hidden",
        page2Vis: "hidden",
        page1Play: true
      });
    }
    if (this.circleState == 1) {
      this.setState({
        page2Vis: "visible",
        page1Vis: "visible",
        page1Play: true
      });
    }
    if (this.circleState == 2) {
      this.setState({
        page3Vis: "visible",
        page2Vis: "hidden",
        page1Vis: "hidden",
        page1Play: false
      });
    }
    if (this.circleState == 3) {
      this.setState({ page4Vis: "visible", page3Vis: "hidden" });
    }
    if (this.circleState == 4) {
      this.setState({ page5Vis: "visible", page4Vis: "hidden" });
    }
    if (this.circleState == 5) {
      this.setState({ page6Vis: "visible", page5Vis: "hidden" });
    }
    if (this.circleState == 6) {
      this.setState({ page7Vis: "visible", page6Vis: "hidden" });
    }
    if (this.circleState == 7) {
      this.setState({ page8Vis: "visible", page7Vis: "hidden" });
    }
  }
  /*When clicked on Prev button*/
  circleFunctionDown() {
    this.setState({
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    this.triangleState = false;
    if (this.circleState == 0) {
      this.circleState = this.maxThemes;
    } else {
      this.circleState -= 1;
    }
    if (this.circleState == 0) {
      this.setState({
        page1Vis: "visible",
        page2Vis: "hidden",
        page1Play: true
      });
    }
    if (this.circleState == 1) {
      this.setState({
        page2Vis: "visible",
        page1Vis: "visible",
        page1Play: true,
        page3Vis: "hidden"
      });
    }
    if (this.circleState == 2) {
      this.setState({ page3Vis: "visible", page4Vis: "hidden" });
    }
    if (this.circleState == 3) {
      this.setState({ page4Vis: "visible", page5Vis: "hidden" });
    }
    if (this.circleState == 4) {
      this.setState({ page5Vis: "visible", page6Vis: "hidden" });
    }
    if (this.circleState == 5) {
      this.setState({ page6Vis: "visible", page7Vis: "hidden" });
    }
    if (this.circleState == 6) {
      this.setState({ page7Vis: "visible", page8Vis: "hidden" });
    }
    if (this.circleState == 7) {
      this.setState({
        page8Vis: "visible",
        page1Vis: "hidden",
        page1Play: false
      });
    }
  }

  /*When clicked on Next button*/
  triangleFunction() {
    this.setState({
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    if (this.triangleState == false) {
      this.setState({
        page1Vis: "hidden",
        page2Vis: "hidden",
        page3Vis: "hidden",
        page4Vis: "hidden",
        page5Vis: "hidden",
        page6Vis: "hidden",
        page7Vis: "hidden",
        page8Vis: "hidden",
        page1Play: false
      });
    } else {
      if (this.circleState == 0) {
        this.setState({
          page1Vis: "visible",
          page1Play: true
        });
      }
      if (this.circleState == 1) {
        this.setState({
          page2Vis: "visible"
        });
      }
      if (this.circleState == 2) {
        this.setState({ page3Vis: "visible" });
      }
      if (this.circleState == 3) {
        this.setState({ page4Vis: "visible" });
      }
      if (this.circleState == 4) {
        this.setState({ page5Vis: "visible" });
      }
      if (this.circleState == 5) {
        this.setState({ page5Vis: "visible" });
      }
      if (this.circleState == 6) {
        this.setState({ page5Vis: "visible" });
      }
      if (this.circleState == 7) {
        this.setState({ page5Vis: "visible" });
      }
    }
    this.triangleState = !this.triangleState;
  }

  /*When Slider position is changed*/
  sliderChange(v) {
    this.setState({ value: v });
    var zoomLevel = (1 / 33) * (v - 1) + 19;
    if (zoomLevel < 20) {
      this.setState({
        scaleDistance: Math.round(16.8 - 8.4 * (zoomLevel - 19))
      });
    } else {
      if (zoomLevel < 21) {
        this.setState({
          scaleDistance: Math.round(8.4 - 4.2 * (zoomLevel - 20))
        });
      } else {
        this.setState({
          scaleDistance: Math.round(4.2 - 2.16 * (zoomLevel - 21))
        });
      }
    }
    this.map.zoomTo(zoomLevel);
  }

  /*Function to toggle image size*/
  toggleImage1() {
    this.setState(prevState => ({
      imageDimX1: 1 - prevState.imageDimX1
    }));
    this.setState(prevState => ({
      imageZindex1: prevState.imageZindex1 == 1 ? 10 : 1
    }));
  }

  researchURL() {
    const location = window.location;
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("query") == "research") {
      this.setState({
        researchState: false,
        researchWidth: "40.5%",
        legendState: true,
        legendHeight: 0
      });
    }
  }

  render() {
    return (
      /*Main Div*/
      <div>
        {/*Background*/}
        {/*Page 1*/}
        {/*Page 1 Video*/}
        <ReactPlayer
          style={{
            position: "fixed",
            top: 0,
            left: -0.1 * this.state.mapWidth,
            visibility: this.state.page1Vis,
            zIndex: 0
          }}
          url={this.theme0Video}
          height={1.2 * this.state.mapHeight}
          width={1.2 * this.state.mapWidth}
          fluid="true"
          playing={this.state.page1Play}
          controls={false}
          volume={0.05}
          muted={this.state.page1mute}
        />
        {/*Page 1 Description*/}
        <div
          style={{
            position: "fixed",
            top: this.themeTop,
            width: this.themeDescWidth,
            left: this.themeDescLeft,
            visibility: this.state.page2Vis,
            zIndex: 1
          }}
        >
          <text className="themeDesc">{this.theme0Desc}</text>
        </div>
        {/*Page 1 Mute Control*/}
        <span
          role="button"
          aria-label="Sound"
          data-balloon-pos="left"
          onClick={this.muteFunction}
          style={{
            fontSize: 32,
            position: "fixed",
            top: 13,
            right: 170,
            visibility: this.state.page1Vis,
            zIndex: 10
          }}
        >
          <FontAwesomeIcon icon={this.state.volumeIcon} color={"black"} />
        </span>
        {/*Map Div*/}
        <div
          ref={el => (this.mapContainer = el)}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "transparent"
          }}
        />

        {/* Page 2: Theme 1*/}
        <div
          style={{
            position: "fixed",
            pointerEvents: "none",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            visibility: this.state.page3Vis
          }}
        >
          {/*Theme 1 Description*/}
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              top: this.themeTop,
              width: this.themeDescWidth,
              left: this.themeDescLeft
            }}
          >
            <text className="themeDesc">{this.theme1Desc}</text>
          </div>
          {/*Theme 1 Video*/}
          <ReactPlayer
            className="video"
            ref={el => (this.video1Ref = el)}
            style={{
              display: "inline-block",
              top: this.themeTop,
              left: this.themeVidLeft,
              zIndex: this.state.videoZindex1
            }}
            url={this.theme1Video}
            width={585}
            height={360}
            controls={true}
          />
        </div>

        {/*Page 4: Theme 3*/}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            visibility: this.state.page4Vis,
            pointerEvents: "none"
          }}
        >
          {/*Theme 3 Description*/}
          <div
            style={{
              position: "absolute",
              top: this.themeTop,
              height: 0.6 * window.innerHeight,
              width: this.themeDescWidth,
              left: this.themeDescLeft,
              pointerEvents: "all",
              overflow: "scroll"
            }}
          >
            <text className="themeDesc">
              {this.theme3Desc1}
              <br />
              <br />
              {this.theme3Desc2}
              <br />
              <br />
              {this.theme3Desc3}
              <br />
              <br />
              {this.theme3Desc4}
            </text>
          </div>
          {/*Theme 3 Video*/}
          <ReactPlayer
            className="video"
            ref={el => (this.video1Ref = el)}
            style={{
              display: "inline-block",
              top: this.themeTop,
              left: this.themeVidLeft,
              zIndex: this.state.videoZindex1,
              transition: "top 1s"
            }}
            width={585}
            height={360}
            url={this.theme3Video}
            controls={true}
          />
        </div>

        {/*Page 5: Theme 4*/}
        <div
          style={{
            position: "fixed",
            pointerEvents: "none",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            visibility: this.state.page5Vis
          }}
        >
          {/*Theme 4 Description*/}
          <div
            style={{
              position: "absolute",
              display: "inline-block",
              top: this.themeTop,
              width: this.themeDescWidth,
              left: this.themeDescLeft
            }}
          >
            <text className="themeDesc">{this.page4Desc}</text>
          </div>
          {/*Theme 4 Video 1*/}
          <ReactPlayer
            className="video"
            style={{
              display: "inline-block",
              top: this.themeTop,
              left: this.themeVidLeft,
              zIndex: this.state.videoZindex4
            }}
            url={this.theme4Video}
            width={680}
            height={360}
            controls={true}
          />
        </div>
        {/*Page 5: Theme 4*/}
        <div
          style={{
            position: "fixed",
            pointerEvents: "none",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            visibility: this.state.page6Vis
          }}
        >
          {/*Theme 4 Description*/}
          <div
            style={{
              position: "absolute",
              display: "inline-block",
              top: this.themeTop,
              width: this.themeDescWidth,
              left: this.themeDescLeft
            }}
          >
            <text className="themeDesc">{this.page5Desc}</text>
          </div>
          {/*Theme 4 Video 2*/}
          <ReactPlayer
            className="video"
            style={{
              display: "inline-block",
              top: this.themeTop,
              left: this.themeVidLeft,
              zIndex: this.state.videoZindex4
            }}
            width={620}
            height={360}
            url={this.theme5Video}
            controls={true}
          />
        </div>
        {/*Page 5: Theme 4*/}
        <div
          style={{
            position: "fixed",
            pointerEvents: "none",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            visibility: this.state.page7Vis
          }}
        >
          {/*Theme 4 Description*/}
          <div
            style={{
              position: "absolute",
              display: "inline-block",
              top: this.themeTop,
              width: this.themeDescWidth,
              left: this.themeDescLeft
            }}
          >
            <text className="themeDesc">{this.page6Desc}</text>
          </div>
          {/*Theme 4 Video 3*/}
          <ReactPlayer
            className="video"
            style={{
              display: "inline-block",
              top: this.themeTop,
              left: this.themeVidLeft,
              zIndex: this.state.videoZindex4
            }}
            url={this.theme6Video}
            width={580}
            height={360}
            controls={true}
          />
        </div>
        {/*Page 5: Theme 4*/}
        <div
          style={{
            position: "fixed",
            pointerEvents: "none",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            visibility: this.state.page8Vis
          }}
        >
          {/*Theme 4 Description*/}
          <div
            style={{
              position: "absolute",
              display: "inline-block",
              top: this.themeTop,
              width: this.themeDescWidth,
              left: this.themeDescLeft
            }}
          >
            <text className="themeDesc">{this.page7Desc}</text>
          </div>
          {/*Theme 4 Video 4*/}
          <ReactPlayer
            className="video"
            style={{
              display: "inline-block",
              top: this.themeTop,
              left: this.themeVidLeft,
              zIndex: this.state.videoZindex4
            }}
            url={this.theme7Video}
            width={585}
            height={360}
            controls={true}
          />
        </div>
        {/*Title Bar*/}
        <div
          className="titlebar"
          style={{ top: -10, width: 600, height: 50, zIndex: 10 }}
        >
          <Typekit kitId="bor7jxc" />
          {/*Home Button*/}
          <span
            role="button"
            aria-label=""
            onClick={this.indexFunction}
            style={{
              fontSize: 48,
              position: "relative",
              display: "inline",
              top: 5.5,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "bottom"
            }}
          >
            &#9675;
          </span>
          {/*About Button*/}
          <span
            role="button"
            aria-label=""
            onClick={this.aboutFunction}
            style={{
              fontFamily: "ballinger-mono",
              fontSize: 24,
              position: "relative",
              display: "inline",
              top: 0,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "bottom"
            }}
          >
            About
          </span>
          {/*Slider Button*/}
          <SliderInput
            min={0}
            max={100}
            step={0.1}
            value={this.state.value}
            style={{
              position: "relative",
              display: "inline-block",
              top: -2,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "bottom",
              verticalAlign: "middle",
              width: 120
            }}
            onChange={value => this.sliderChange(value)}
          >
            <SliderTrack style={{ height: 1 }}>
              <SliderTrackHighlight />
              <SliderHandle />
            </SliderTrack>
          </SliderInput>
          {/*Prev Button*/}
          <span
            role="button"
            aria-label="Previous"
            data-balloon-pos="down-right"
            onClick={this.circleFunctionDown}
            style={{
              fontSize: 32,
              position: "relative",
              display: "inline",
              marginLeft: 10,
              marginRight: 10,
              textAlign: "bottom"
            }}
          >
            &#x25E7;
          </span>
          {/*Next Button*/}
          <span
            role="button"
            aria-label="Next"
            data-balloon-pos="down-right"
            onClick={this.circleFunction}
            style={{
              fontSize: 32,
              position: "relative",
              display: "inline",
              marginLeft: 10,
              marginRight: 10,
              textAlign: "bottom"
            }}
          >
            &#x25E8;
          </span>
          {/*Triangle Button*/}
          <span
            role="button"
            aria-label="Map"
            data-balloon-pos="down-right"
            onClick={this.triangleFunction}
            style={{
              fontSize: 30,
              position: "relative",
              display: "inline-block",
              top: 3,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "bottom"
            }}
          >
            &#9653;
          </span>
          {/*Glossary Button*/}
          <span
            role="button"
            aria-label="Glossary"
            data-balloon-pos="down-right"
            onClick={this.glossaryFunction}
            style={{
              fontSize: 26,
              position: "relative",
              display: "inline",
              marginLeft: 10,
              marginRight: 10,
              textAlign: "bottom"
            }}
          >
            &#9636;
          </span>
          {/*Research Button*/}
          <span
            role="button"
            aria-label=""
            onClick={this.researchFunction}
            style={{
              fontFamily: "ballinger-mono",
              fontSize: 24,
              position: "relative",
              display: "inline",
              top: 0,
              marginLeft: 10,
              textAlign: "bottom"
            }}
          >
            Research
          </span>
        </div>
        {/*Map Scale Top Right*/}
        <div>
          <span className="mapScaleMain" />
          <span className="mapScaleSide" style={{ right: 25 }} />
          <span className="mapScaleSide" style={{ right: 145 }} />
          <text className="mapScaleNumber" style={{ right: 25 }}>
            {this.state.scaleDistance} meters
          </text>
        </div>
        {/*About Window*/}
        <div
          className="about"
          ref={this.aboutRef}
          style={{
            width: this.state.aboutWidth,
            height: window.innerHeight,
            zIndex: 100
          }}
        >
          {/*About Window - Close Button*/}
          <span
            role="button"
            aria-label=""
            onClick={this.aboutFunction}
            style={{
              fontSize: 16,
              position: "absolute",
              marginLeft: 10,
              marginTop: 10,
              color: "white",
              zIndex: 101
            }}
          >
            &#10005;
          </span>
          {/*About Window - Text Content*/}
          <div
            style={{
              fontSize: 16,
              marginLeft: 50,
              marginRight: 50,
              marginTop: 25
            }}
          >
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif"
              }}
            >
              {" "}
              {this.aboutText}{" "}
            </p>
            <hr />
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              TOOLS{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {this.aboutTools}
            </p>
            <hr />
            <p
              style={{
                fontFamily: "ballinger-mono"
              }}
            >
              {" "}
              REFERENCES{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif"
              }}
            >
              {" "}
              John Colapinto, ‘Famous Names, does it matter what a product is
              called’, <i>New Yorker</i>, 26 September 2011 <br />
              <br /> Prestige, ‘Prestige Jo Biwi se - Pressure Cooker’,{" "}
              <i>YouTube</i>, 26 February 2012 <br />
              <br /> {this.aboutReferenceText}
              <br />
              <br />
            </p>
          </div>
        </div>
        {/*Glossary Window*/}
        <div
          className="about"
          ref={this.glossaryRef}
          style={{
            width: this.state.glossaryWidth,
            height: window.innerHeight,
            zIndex: 100
          }}
        >
          {/*glossary Window - Close Button*/}
          <span
            role="button"
            aria-label=""
            onClick={this.glossaryFunction}
            style={{
              fontSize: 16,
              position: "absolute",
              marginLeft: 10,
              marginTop: 10,
              color: "white",
              zIndex: 101
            }}
          >
            &#10005;
          </span>
          {/*Glossary Window - Text Content*/}
          <div
            style={{
              fontSize: 16,
              marginLeft: 50,
              marginRight: 50,
              marginTop: 25
            }}
          >
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              BAZAR{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutBazar}{" "}
            </p>
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              DOWRY{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutDowry}{" "}
            </p>
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              BANGLES{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutBangles}{" "}
            </p>
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              GANGA{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutGanga}{" "}
            </p>
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              ASHIRWAD{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutAshirwad}{" "}
            </p>
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              ANNAPURNA{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutAnnapurna}{" "}
            </p>
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              IMAM{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutImam}{" "}
            </p>
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              AZAN{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutAzan}{" "}
            </p>
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              TELANGANA{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutTelangana}{" "}
            </p>
            <p
              style={{
                fontFamily: "ballinger-mono",
                marginBottom: 0
              }}
            >
              {" "}
              INDIA'S CURRENT POLITICAL CLIMATE{" "}
            </p>
            <p
              style={{
                fontFamily: "kazimirtext, sans-serif",
                marginTop: 0
              }}
            >
              {" "}
              {this.aboutIndia}{" "}
            </p>
              <br />
              <br />
          </div>
        </div>
        {/*Legend Window*/}
        <div
          id="legendWindow"
          className="legend"
          ref={this.legendRef}
          style={{
            width: window.innerWidth,
            height: this.state.legendHeight,
            fontSize: 28,
            zIndex: 100
          }}
        >
          {/*Legend Window - Content Div Left*/}
          <div
            style={{
              marginTop: 5,
              marginLeft: 50,
              fontFamily: "ballinger-mono",
              fontWeight: "Light",
              fontSize: 10,
              display: "inline-block"
            }}
          >
            {/*Legend Gods*/}
            <div
              style={{
                marginLeft: 10
              }}
            >
              <span
                className="legendDot"
                style={{ background: this.godsColor }}
              />
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 10
                }}
              >
                Place of Worship; # Stores: 63; Commonly Sold: Religion
              </p>
            </div>
            {/*Legend Gods Stores*/}
            <div
              style={{
                marginLeft: 10,
                marginTop: -17
              }}
            >
              <span
                className="legendDot"
                style={{ background: this.godsStoreColor }}
              />
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 10
                }}
              >
                Religious Goods; # Stores: 37; Commonly Sold: Idols, Incense,
                Vermillon
              </p>
            </div>
            {/*Legend Beauty & Wedding*/}
            <div
              style={{
                marginLeft: 10,
                marginTop: -17
              }}
            >
              <span
                className="legendDot"
                style={{ background: this.bnwColor }}
              />
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 10
                }}
              >
                Beauty & Wedding; # Stores: 196; Commonly Sold: Bangles,
                Jewelry, Cosmetics, Bridal wear
              </p>
            </div>
            {/*Legend Kitchen Utensils*/}
            <div
              style={{
                marginLeft: 10,
                marginTop: -17
              }}
            >
              <span
                className="legendDot"
                style={{ background: this.kitchenColor }}
              />
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 10
                }}
              >
                Kitchen Utensils; # Stores: 115; Commonly Sold: Pots, Pans,
                Ladles, Crockery
              </p>
            </div>
            {/*Legend Grocery*/}
            <div
              style={{
                marginLeft: 10,
                marginTop: -17
              }}
            >
              <span
                className="legendDot"
                style={{ background: this.groceryColor }}
              />
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 10
                }}
              >
                Grocery; # Stores: 33; Commonly Sold: Grains, Spices
              </p>
            </div>
          </div>
          {/*Legend Window - Content Div Right*/}
          <div
            style={{
              marginTop: 5,
              marginLeft: 100,
              fontFamily: "ballinger-mono",
              fontWeight: "Light",
              fontSize: 10,
              display: "inline-block"
            }}
          >
            {/*Legend Toys*/}
            <div
              style={{
                marginLeft: 10
              }}
            >
              <span
                className="legendDot"
                style={{ background: this.toysColor }}
              />
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 10
                }}
              >
                Toys; # Stores: 77; Commonly Sold: Dolls, Bikes, Stuffed animals
              </p>
            </div>
            {/*Legend Plastic Goods*/}
            <div
              style={{
                marginLeft: 10,
                marginTop: -17
              }}
            >
              <span
                className="legendDot"
                style={{ background: this.plasticColor }}
              />
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 10
                }}
              >
                Plastic Goods; # Stores: 71; Commonly Sold: Mops, Buckets,
                Diapers
              </p>
            </div>
            {/*Legend Restaurant*/}
            <div
              style={{
                marginLeft: 10,
                marginTop: -17
              }}
            >
              <span
                className="legendDot"
                style={{ background: this.restoColor }}
              />
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 10
                }}
              >
                Restaurant; # Stores: 5; Commonly Sold: Meals & snacks
              </p>
            </div>
            {/*Legend Bars & Liquor*/}
            <div
              style={{
                marginLeft: 10,
                marginTop: -17
              }}
            >
              <span
                className="legendDot"
                style={{ background: this.barsColor }}
              />
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 10
                }}
              >
                Bar & Liquor; # Stores: 2; Commonly Sold: Alcholic beverages
              </p>
            </div>
            {/*Legend Keyboard*/}
            <div
              style={{
                marginLeft: 10,
                marginTop: -17
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  fontSize: 14
                }}
              >
                &#10045;
              </span>
              <p
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: 11
                }}
              >
                Use arrow keys on keyboard to navigate the map
              </p>
            </div>
          </div>
        </div>
        {/*Research Window*/}
        <div
          className="research"
          ref={this.researchRef}
          style={{
            width: this.state.researchWidth,
            leftBorder: this.state.researchBorder,
            height: window.innerHeight,
            fontSize: 28,
            zIndex: 100
          }}
        >
          {/*Research Window - Close Button*/}
          <span
            role="button"
            aria-label=""
            onClick={this.researchFunction}
            style={{
              fontSize: 16,
              position: "fixed",
              marginTop: 10,
              marginLeft: 10,
              color: "white",
              zIndex: 102
            }}
          >
            &#10005;
          </span>
          <div
            style={{ position: "absolute", right: this.state.mapWidth / 30 }}
          >
            {/*Research Window - PDF 1*/}
            <SinglePagePDFViewer
              height={this.state.mapHeight - 90}
              pdf={sampleBase64pdf}
            />
          </div>
        </div>
        {/*Map Dots PopUps*/}
        <div>
          <text
            style={{
              fontFamily: "ballinger-mono",
              fontWeight: "Light",
              fontSize: 12,
              position: "fixed",
              left: this.state.popUpX,
              top: this.state.popUpY,
              textAlign: "center",
              color: "white",
              backgroundColor: this.state.popUpColor,
              alignSelf: "flex-start",
              padding: this.state.popUpPad
            }}
          >
            {this.state.pointName} <br /> {this.state.layerName}
          </text>
        </div>
      </div>
    );
  }
}
export default Application;
