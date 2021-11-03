'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">movies documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-5a25cf8c09e61ffc72a60fb66cffacfc"' : 'data-target="#xs-controllers-links-module-AppModule-5a25cf8c09e61ffc72a60fb66cffacfc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-5a25cf8c09e61ffc72a60fb66cffacfc"' :
                                            'id="xs-controllers-links-module-AppModule-5a25cf8c09e61ffc72a60fb66cffacfc"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/HealthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-5a25cf8c09e61ffc72a60fb66cffacfc"' : 'data-target="#xs-injectables-links-module-AppModule-5a25cf8c09e61ffc72a60fb66cffacfc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-5a25cf8c09e61ffc72a60fb66cffacfc"' :
                                        'id="xs-injectables-links-module-AppModule-5a25cf8c09e61ffc72a60fb66cffacfc"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-59ad65176897e9291607245d4a480fc2"' : 'data-target="#xs-controllers-links-module-AuthModule-59ad65176897e9291607245d4a480fc2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-59ad65176897e9291607245d4a480fc2"' :
                                            'id="xs-controllers-links-module-AuthModule-59ad65176897e9291607245d4a480fc2"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-59ad65176897e9291607245d4a480fc2"' : 'data-target="#xs-injectables-links-module-AuthModule-59ad65176897e9291607245d4a480fc2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-59ad65176897e9291607245d4a480fc2"' :
                                        'id="xs-injectables-links-module-AuthModule-59ad65176897e9291607245d4a480fc2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FacebookStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FacebookStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link">DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GenresModule.html" data-type="entity-link">GenresModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-GenresModule-da874a95bf4c98d57928b73f09ff4b88"' : 'data-target="#xs-controllers-links-module-GenresModule-da874a95bf4c98d57928b73f09ff4b88"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GenresModule-da874a95bf4c98d57928b73f09ff4b88"' :
                                            'id="xs-controllers-links-module-GenresModule-da874a95bf4c98d57928b73f09ff4b88"' }>
                                            <li class="link">
                                                <a href="controllers/GenresController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GenresController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GenresModule-da874a95bf4c98d57928b73f09ff4b88"' : 'data-target="#xs-injectables-links-module-GenresModule-da874a95bf4c98d57928b73f09ff4b88"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GenresModule-da874a95bf4c98d57928b73f09ff4b88"' :
                                        'id="xs-injectables-links-module-GenresModule-da874a95bf4c98d57928b73f09ff4b88"' }>
                                        <li class="link">
                                            <a href="injectables/GenresService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GenresService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtAuthGuard</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDirectorModule.html" data-type="entity-link">MovieDirectorModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MovieDirectorModule-1cd33ab59982a624a3c3273ada99444d"' : 'data-target="#xs-injectables-links-module-MovieDirectorModule-1cd33ab59982a624a3c3273ada99444d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MovieDirectorModule-1cd33ab59982a624a3c3273ada99444d"' :
                                        'id="xs-injectables-links-module-MovieDirectorModule-1cd33ab59982a624a3c3273ada99444d"' }>
                                        <li class="link">
                                            <a href="injectables/MovieDirectorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MovieDirectorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieGenresModule.html" data-type="entity-link">MovieGenresModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MovieGenresModule-4f5723b447b44457d86245bab5027dbb"' : 'data-target="#xs-injectables-links-module-MovieGenresModule-4f5723b447b44457d86245bab5027dbb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MovieGenresModule-4f5723b447b44457d86245bab5027dbb"' :
                                        'id="xs-injectables-links-module-MovieGenresModule-4f5723b447b44457d86245bab5027dbb"' }>
                                        <li class="link">
                                            <a href="injectables/MovieGenresService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MovieGenresService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieModule.html" data-type="entity-link">MovieModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MovieModule-53aaec394077c04286c6ecb1bc272de6"' : 'data-target="#xs-controllers-links-module-MovieModule-53aaec394077c04286c6ecb1bc272de6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MovieModule-53aaec394077c04286c6ecb1bc272de6"' :
                                            'id="xs-controllers-links-module-MovieModule-53aaec394077c04286c6ecb1bc272de6"' }>
                                            <li class="link">
                                                <a href="controllers/MovieController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MovieModule-53aaec394077c04286c6ecb1bc272de6"' : 'data-target="#xs-injectables-links-module-MovieModule-53aaec394077c04286c6ecb1bc272de6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MovieModule-53aaec394077c04286c6ecb1bc272de6"' :
                                        'id="xs-injectables-links-module-MovieModule-53aaec394077c04286c6ecb1bc272de6"' }>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MovieActorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MovieActorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MovieService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MovieService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersonsModule.html" data-type="entity-link">PersonsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PersonsModule-c798ff47c6e7e7c45fa53f8e74375207"' : 'data-target="#xs-controllers-links-module-PersonsModule-c798ff47c6e7e7c45fa53f8e74375207"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PersonsModule-c798ff47c6e7e7c45fa53f8e74375207"' :
                                            'id="xs-controllers-links-module-PersonsModule-c798ff47c6e7e7c45fa53f8e74375207"' }>
                                            <li class="link">
                                                <a href="controllers/PersonsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PersonsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PersonsModule-c798ff47c6e7e7c45fa53f8e74375207"' : 'data-target="#xs-injectables-links-module-PersonsModule-c798ff47c6e7e7c45fa53f8e74375207"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersonsModule-c798ff47c6e7e7c45fa53f8e74375207"' :
                                        'id="xs-injectables-links-module-PersonsModule-c798ff47c6e7e7c45fa53f8e74375207"' }>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PersonsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PersonsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductionHouseModule.html" data-type="entity-link">ProductionHouseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductionHouseModule-e0a042c13009eb062c536cd5ffe97737"' : 'data-target="#xs-controllers-links-module-ProductionHouseModule-e0a042c13009eb062c536cd5ffe97737"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductionHouseModule-e0a042c13009eb062c536cd5ffe97737"' :
                                            'id="xs-controllers-links-module-ProductionHouseModule-e0a042c13009eb062c536cd5ffe97737"' }>
                                            <li class="link">
                                                <a href="controllers/ProductionHouseController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductionHouseController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductionHouseModule-e0a042c13009eb062c536cd5ffe97737"' : 'data-target="#xs-injectables-links-module-ProductionHouseModule-e0a042c13009eb062c536cd5ffe97737"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductionHouseModule-e0a042c13009eb062c536cd5ffe97737"' :
                                        'id="xs-injectables-links-module-ProductionHouseModule-e0a042c13009eb062c536cd5ffe97737"' }>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductionHouseService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProductionHouseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link">ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProfileModule-a63fc2926da23a9763801ec87a77a32e"' : 'data-target="#xs-controllers-links-module-ProfileModule-a63fc2926da23a9763801ec87a77a32e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileModule-a63fc2926da23a9763801ec87a77a32e"' :
                                            'id="xs-controllers-links-module-ProfileModule-a63fc2926da23a9763801ec87a77a32e"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProfileModule-a63fc2926da23a9763801ec87a77a32e"' : 'data-target="#xs-injectables-links-module-ProfileModule-a63fc2926da23a9763801ec87a77a32e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-a63fc2926da23a9763801ec87a77a32e"' :
                                        'id="xs-injectables-links-module-ProfileModule-a63fc2926da23a9763801ec87a77a32e"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RateingModule.html" data-type="entity-link">RateingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RateingModule-07d45d94309a0ec7703acd81dc336571"' : 'data-target="#xs-controllers-links-module-RateingModule-07d45d94309a0ec7703acd81dc336571"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RateingModule-07d45d94309a0ec7703acd81dc336571"' :
                                            'id="xs-controllers-links-module-RateingModule-07d45d94309a0ec7703acd81dc336571"' }>
                                            <li class="link">
                                                <a href="controllers/RateingController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RateingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RateingModule-07d45d94309a0ec7703acd81dc336571"' : 'data-target="#xs-injectables-links-module-RateingModule-07d45d94309a0ec7703acd81dc336571"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RateingModule-07d45d94309a0ec7703acd81dc336571"' :
                                        'id="xs-injectables-links-module-RateingModule-07d45d94309a0ec7703acd81dc336571"' }>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RatingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RatingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewModule.html" data-type="entity-link">ReviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReviewModule-e8e81f7e271bd3a8476c3c84add4ef30"' : 'data-target="#xs-controllers-links-module-ReviewModule-e8e81f7e271bd3a8476c3c84add4ef30"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewModule-e8e81f7e271bd3a8476c3c84add4ef30"' :
                                            'id="xs-controllers-links-module-ReviewModule-e8e81f7e271bd3a8476c3c84add4ef30"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewModule-e8e81f7e271bd3a8476c3c84add4ef30"' : 'data-target="#xs-injectables-links-module-ReviewModule-e8e81f7e271bd3a8476c3c84add4ef30"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewModule-e8e81f7e271bd3a8476c3c84add4ef30"' :
                                        'id="xs-injectables-links-module-ReviewModule-e8e81f7e271bd3a8476c3c84add4ef30"' }>
                                        <li class="link">
                                            <a href="injectables/ReviewService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ReviewService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-bdc8ef438e2c3af0e2e29cb9046c54c5"' : 'data-target="#xs-injectables-links-module-UsersModule-bdc8ef438e2c3af0e2e29cb9046c54c5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-bdc8ef438e2c3af0e2e29cb9046c54c5"' :
                                        'id="xs-injectables-links-module-UsersModule-bdc8ef438e2c3af0e2e29cb9046c54c5"' }>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link">AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GenresController.html" data-type="entity-link">GenresController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link">HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MovieController.html" data-type="entity-link">MovieController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PersonsController.html" data-type="entity-link">PersonsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductionHouseController.html" data-type="entity-link">ProductionHouseController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProfileController.html" data-type="entity-link">ProfileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RateingController.html" data-type="entity-link">RateingController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReviewController.html" data-type="entity-link">ReviewController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/actorMovieDTO.html" data-type="entity-link">actorMovieDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/APIFeatures.html" data-type="entity-link">APIFeatures</a>
                            </li>
                            <li class="link">
                                <a href="classes/directorMovieDTO.html" data-type="entity-link">directorMovieDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploadDto.html" data-type="entity-link">FileUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Genre.html" data-type="entity-link">Genre</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenreDto.html" data-type="entity-link">GenreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/genreMovieDTO.html" data-type="entity-link">genreMovieDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Movie.html" data-type="entity-link">Movie</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieActor.html" data-type="entity-link">MovieActor</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieDirector.html" data-type="entity-link">MovieDirector</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieDto.html" data-type="entity-link">MovieDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieGenre.html" data-type="entity-link">MovieGenre</a>
                            </li>
                            <li class="link">
                                <a href="classes/Person.html" data-type="entity-link">Person</a>
                            </li>
                            <li class="link">
                                <a href="classes/PersonDto.html" data-type="entity-link">PersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductionDto.html" data-type="entity-link">ProductionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductionHouse.html" data-type="entity-link">ProductionHouse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Profile.html" data-type="entity-link">Profile</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rate.html" data-type="entity-link">Rate</a>
                            </li>
                            <li class="link">
                                <a href="classes/Review.html" data-type="entity-link">Review</a>
                            </li>
                            <li class="link">
                                <a href="classes/SocialUserDto.html" data-type="entity-link">SocialUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link">UserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FacebookStrategy.html" data-type="entity-link">FacebookStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GenresService.html" data-type="entity-link">GenresService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link">GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link">JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link">LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieActorService.html" data-type="entity-link">MovieActorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieDirectorService.html" data-type="entity-link">MovieDirectorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieGenresService.html" data-type="entity-link">MovieGenresService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieService.html" data-type="entity-link">MovieService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersonsService.html" data-type="entity-link">PersonsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductionHouseService.html" data-type="entity-link">ProductionHouseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link">ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RatingService.html" data-type="entity-link">RatingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewService.html" data-type="entity-link">ReviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link">RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IDatabaseConfig.html" data-type="entity-link">IDatabaseConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDatabaseConfigAttributes.html" data-type="entity-link">IDatabaseConfigAttributes</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});