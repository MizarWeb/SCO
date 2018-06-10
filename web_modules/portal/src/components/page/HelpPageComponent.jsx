/**
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/
import { CardTitle, Modal } from '@sco/components'
import { CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Divider from 'material-ui/Divider'
import './HelpPageComponent.css'

/**
 * This text will be detected and altered by the WebpackAutoInject plugin
 */
const scoBuildInfos = '[AIV]SCO build V{version} - {date}[/AIV]'


/**
 * Help & info page with copyright
 * @author Léo Mieulet
 */
export class HelpPageComponent extends React.Component {
  static propTypes = {
    closeHelp: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  static contextTypes = {
    intl: PropTypes.object,
  }
  static labNameStyle = {
    whiteSpace: 'normal',
  }
  static imgStyle = {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '75px',
  }
  static smallerImgStyle = {
    ...HelpPageComponent.imgStyle,
    maxHeight: '55px',
  }

  render() {
    return (
      <Modal
        title={
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'page.help.title' })}
          />
        }
        onClose={this.props.closeHelp}
        mounted={this.props.mounted}
        hasSubtitle
      >
        <div>
          <CardText>
            <b>{scoBuildInfos}</b>

            <div className="scenario"><b>Scénario:</b> <i>Palavas-les-Flots sous surveillance</i></div>
Le LEGOS a développé la procédure en coopération avec le CNES (fourniture des Modèles numériques de terrain) et son pôle de données altimétriques AVISO (fourniture des données de niveau de la mer), le BRGM (modélisation hydrodynamique des tempêtes) et CLS (traitement des données du niveau de la mer). CLS a également finalisé le recalage des MNT avec les niveaux de la mer grâce au système de référence géodésique fourni par le GRGS. La méthode a été validée avec les données de nivellement in situ de l’IGN ainsi qu’avec les données lidar de son programme LITTO 3D développé avec le SHOM. Le projet a pu être mené à bien grâce au financement du programme TOSCA du CNES.

<div className="institute-partner">
<a href="http://www.shom.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/shom-logo.jpg" alt="SHOM" /></a>
<a href="http://www.ign.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/IGN.png" alt="IGN" /></a>
<a href="https://www.cls.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/cls.png" alt="CLS" /></a>
<a href="http://grgs.obs-mip.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/GRGS.gif" alt="GRGS" /></a>
<a href="http://www.cnes.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>                
<a href="http://www.legos.obs-mip.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
<a href="http://www.cnrs.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" alt="CNRS" /></a>
</div>
            <Divider />

            <div className="scenario"><b>Scénario:</b> <i>Tous les chemins de l&apos;eau mènent à Niamey</i></div>
En partenariat avec le CNES qui fournit les données satellite, ce projet est porté par l’IRD et l INSU/CNRS, via le laboratoire GET et le LEGOS, en coopération avec l’Autorité du Bassin du Niger. Utilisateur final, l’ABN apporte les données de terrain et son expertise pour la validation. L’IRD a organisé les campagnes de validation in situ  des données satellitaires de pluie à Niamey  et Ouagadougou, financées par le CNES dans le cadre de Megha-Tropiques. L’IRD a développé le modèle hydrologique MGB adapté au Niger avec l’institut de recherche hydrologique brésilien IPH. Les produits TAPEER sont diffusés sur le pôle de données Aeris. L’intégration des données spatiales et de la modélisation pour favoriser les applications est soutenue par le programme SWOT aval du CNES.

<div className="institute-partner">
<a href="http://www.cnes.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>
<a href="http://www.legos.obs-mip.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
<a href="http://www.ird.fr/"><img style={HelpPageComponent.smallerImgStyle} src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="IRD" /></a>
<a href="http://www.get.obs-mip.fr"><img style={HelpPageComponent.smallerImgStyle} src="http://80.158.22.249/resources/sco/logos/get.png" alt="GET"/></a>
<a href="http://www.abn.ne/index.php?option=com_content&view=frontpage&Itemid=1&lang=fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
<a href="http://www.ufrgs.br/iph/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/IPH.png" alt="Instituto de Pesquisas Hidráulicas" /></a>
<a href="http://www.aeris-data.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logoAeris.png" alt="AERIS" /></a>
<a href=""><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/Swot.jpg" alt="Swot Aval" /></a>
</div>
            <Divider />

            <div className="scenario"><b>Scénario:</b> <i>La perte d'altitude du Mont-Blanc</i></div>

Cette méthode d’observation spatiale a été développée par les chercheurs du LEGOS à partir des images Spot 5 et Pléiades, fournies par le CNES. La méthode a été validée grâce aux mesures de terrain des chercheurs de l’IGE, au travers de leur programme GlacioClim. Les financements TOSCA (CNES) et PNTS ont soutenu tous ces chercheurs.
<br/>
<div className="institute-partner">
<a href="http://www.cnes.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>
<a href="http://www.abn.ne/index.php?option=com_content&view=frontpage&Itemid=1&lang=fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
<a href="http://www.cnrs.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" alt="CNRS" /></a>
<a href="http://www.ird.fr/"><img style={HelpPageComponent.smallerImgStyle} src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="IRD" /></a>
<a href="http://www.ups-tlse.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/UPS.jpg" alt="UPS" /></a>
<a href="http://www.obs-mip.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/OMP_logo_CMYK.jpg" alt="OMP" /></a>
<a href="http://www.ige-grenoble.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/IGE.png" alt="IGE" /></a>
</div>
            <Divider />

            <div className="scenario"><b>Scénario:</b> <i>TODO POYANG</i></div>

            <Divider />

            <div className="scenario"><b>Scénario:</b> <i>Anticiper la sécheresse agronomique de l&apos;Inde</i></div>
			
Pilote du projet, le CESBIO a développé les algorithmes de traitement des données SMOS et Sentinel avec le support du laboratoire CEFIRSE-IRD, de l’INSU- CNRS et du CEFIRES NGRI BRGM. Les données satellite ont été fournies par le Centre Aval de Traitement des Données SMOS (CATDS) du CNES et par l’Ifremer, ainsi que par l’ESA dans le cadre des programmes Living planet et Copernicus. Les chercheurs ont été financés grâce au programme TOSCA du CNES et ESA Living Planet. Née de ces travaux, la start-up AAPAH Innovation s’est installée à Hyderabad, capitale de la région indienne de l’Andhra Pradesh.
<br/>
<div className="institute-partner">
<a href="http://www.aapahinnovations.com"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo-aapah.png" alt="AAPAH Innovation" /></a>
<a href="http://www.esa.int/ESA"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo-ESA.png" alt="ESA" /></a>
<a href="http://www.esa.int/ESA"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/CATDS.png" alt="CATDS" /></a>
<a href="https://cnes.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>
<a href="http://www.cesbio.ups-tlse.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/Logo_Cesbio.png" alt="CESBIO" /></a>
<a href="http://www.insu.cnrs.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo_CNRS_INSU.jpg" alt="CNRS/INSU" /></a>
<a href="http://www.get.obs-mip.fr/international/lmi/lmicefirse"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/Logo_cefirse.png" alt="CEFIRSE" /></a>
<a href="http://ngri.org.in"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo_ngri.png" alt="NGRI" /></a>
<a href="http://www.brgm.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/BRGM.png" alt="BRGM" /></a>
<a href="https://wwz.ifremer.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/Logo-Ifremer.jpg" alt="IFREMER" /></a>
</div>

			<Divider />
            <div className="scenario"><b>Logiciels:</b></div>

<div className="institute-partner">
<a href="https://github.com/MizarWeb"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/mizar.png" alt="MIZAR - 3D library" /></a>
<a href="https://github.com/RegardsOss/regards-frontend"><img style={HelpPageComponent.smallerImgStyle} src="http://80.158.22.249/resources/sco/logos/regards.png" alt="Regards-frontend" /></a>
<a href="http://mapserver.org/"><img style={HelpPageComponent.smallerImgStyle} src="http://mapserver.org/_static/banner.png" alt="mapserver" /></a>
</div>
          </CardText>
          <CardActions style={HelpPageComponent.actionWrapperStyle}>
            <RaisedButton
              label={this.context.intl.formatMessage({ id: 'page.actions.close' })}
              onClick={this.props.closeHelp}
            />
          </CardActions>
        </div>
      </Modal >
    )
  }
}

export default HelpPageComponent
