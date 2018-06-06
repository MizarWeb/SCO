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

  render() {
    return (
      <Modal
        title={
          <CardTitle
            title="Information & acknowledgement"
          />
        }
        onClose={this.props.closeHelp}
        mounted={this.props.mounted}
        hasSubtitle={false}
      >
        <div>
          <CardText>
	    <b>{scoBuildInfos}</b>

	    <br/><br/><br/>

	    <b>Scénario:</b><i> Du changement global aux impacts locaux</i>
	    <table className="data">            
              <tr>
                <td><a href="http://marine.copernicus.eu/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/cartouche-weather-climate.jpg" alt="Marine Copernicus"/></a></td>
                <td>COPERNICUS MARINE ENVIRONMENT MONITORING SERVICE</td>      
              </tr>
	    </table>

	    <br/><br/><br/>
	
	    <b>Scénario:</b> <i>Palavas-les-Flots sous surveillance</i>	
	    <table className="data">
            <tr>
              <td colspan="2"><a href="http://www.legos.obs-mip.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS"/></a></td>
              <td>Laboratoire d’études en géophysique et océanographie spatiales</td>      
            </tr>	
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.cnes.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES"/></a></td>
	      <td>Centre National d'Etudes Spatiales</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.cnrs.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" alt="CNRS"/></a></td>
	      <td>Centre National de la Recherche Scientifique</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.ird.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="IRD"/></a></td>
	      <td>Institut de Recherche pour le Développement</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.ups-tlse.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/UPS.jpg" alt="UPS"/></a></td>
	      <td>Université Paul Sabatier</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.obs-mip.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/OMP_logo_CMYK.jpg" alt="OMP"/></a></td>
	      <td>Observatoire Midi-Pyrénées</td>
	    </tr>
	    <tr>
	      <td colspan="2"><a href="https://www.aviso.altimetry.fr/en/home.html"><img width="75px" src="http://80.158.22.249/resources/sco/logos/Logo-AVISO.jpg" alt="AVISO"/></a></td>
	      <td>AVISO</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.odatis-ocean.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/Logo-Odatis_fullsize.png.jpg" alt="ODATIS"/></a></td>
	      <td>Données et services pour 'océan</td>
	    </tr>
            <tr>
              <td><a href="http://www.brgm.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/BRGM.png" alt="BRGM"/></a></td>
              <td>Bureau de recherches géologiques et minières</td>      
            </tr>
            <tr>
              <td><a href="http://grgs.obs-mip.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/GRGS.gif" alt="GRGS"/></a></td>
              <td>Groupe de recherche de géodésie spatiale</td>      
            </tr>
            <tr>
              <td><a href="https://www.cls.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/cls.png" alt="CLS"/></a></td>
              <td>Collecte localisation services</td>      
            </tr>
            <tr>
              <td><a href="http://www.ign.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/IGN.png" alt="IGN"/></a></td>
              <td>Institut national de l’information géographique et forestière</td>      
            </tr>
            <tr>
              <td><a href="http://www.shom.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/shom-logo.jpg" alt="SHOM"/></a></td>
              <td>Service hydrographique et océanographique de la marine</td>      
            </tr>
	    </table>

	    <br/><br/><br/>

	    <b>Scénario:</b> <i>ne recrudescence des innondations</i>
	    <table className="data">
            <tr>
              <td><a href="http://www.get.obs-mip.fr">GET</a></td>
              <td>Laboratoire d’études en géophysique et océanographie spatiales</td>      
            </tr>
            <tr>
              <td colspan="2"><a href="http://www.legos.obs-mip.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS"/></a></td>
              <td>Laboratoire d’études en géophysique et océanographie spatiales</td>      
            </tr>	
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.cnes.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES"/></a></td>
	      <td>Centre National d'Etudes Spatiales</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.cnrs.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" alt="CNRS"/></a></td>
	      <td>Centre National de la Recherche Scientifique</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.cnrs.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="CNRS"/></a></td>
	      <td>Institut de Recherche pour le Développement</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.ups-tlse.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/UPS.jpg" alt="UPS"/></a></td>
	      <td>Université Paul Sabatier</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.obs-mip.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/OMP_logo_CMYK.jpg" alt="OMP"/></a></td>
	      <td>Observatoire Midi-Pyrénées</td>
	    </tr>
            <tr>
              <td><a href="http://www.abn.ne/index.php?option=com_content&view=frontpage&Itemid=1&lang=fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS"/></a></td>
              <td>Autorité du Bassin du Niger</td>      
            </tr>
            <tr>
              <td>IPH</td>
              <td>Instituto des pesquisas Hydraulicas ; Universidad federal de Rio Grande do Sur</td>      
            </tr>
            <tr>
              <td><img width="75px" src="http://80.158.22.249/resources/sco/logos/Swot.jpg" alt="Swot"/></td>
              <td>SWOT Aval</td>      
            </tr>
            <tr>
              <td><img width="75px" src="http://80.158.22.249/resources/sco/logos/logoAeris.png" alt="AERIS"/></td>
              <td>AERIS</td>      
            </tr>	
	    </table>

	    <br/><br/><br/>

	    <b>Scénario:</b> <i>La perte d'altitude du Mont-Blanc</i>
	    <table className="data">
            <tr>
              <td colspan="2"><a href="http://www.legos.obs-mip.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png"  alt="LEGOS"/></a></td>
              <td>Laboratoire d'études en géophysique et océanographie spatiales</td>      
            </tr>	
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.cnes.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES"/></a></td>
	      <td>Centre National d'Etudes Spatiales</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.cnrs.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" alt="CRNS"/></a></td>
	      <td>Centre National de la Recherche Scientifique</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.ird.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="IRD"/></a></td>
	      <td>Institut de Recherche pour le Développement</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.ups-tlse.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/UPS.jpg" alt="UPS"/></a></td>
	      <td>Université Paul Sabatier</td>
	    </tr>
	    <tr>
	      <td>&nbsp;</td>
	      <td><a href="http://www.obs-mip.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/OMP_logo_CMYK.jpg" alt="OMP"/></a></td>
	      <td>Observatoire Midi-Pyrénées</td>
	    </tr>
            <tr>
              <td><a href="http://www.ige-grenoble.fr/"><img width="75px" src="http://80.158.22.249/resources/sco/logos/IGE.png" alt="IGE"/></a></td>
              <td>Institut des géosciences de l'environnement</td>      
            </tr>	
	    </table>	

	    <br/><br/><br/>

	    <b>Scénario:</b> <i>TODO POYANG</i>
	    <table className="data">
            <tr>
              <th>Institute</th>
              <th>Label</th>
            </tr>
            <tr>
              <td><a href="http://www.cesbio.ups-tlse.fr">TODO</a></td>
              <td>TODO</td>      
            </tr>
	    </table>	

	    <br/><br/><br/>

	    <b>Scénario:</b> <i>Surveiller l'eau et la secheresse</i>
	    <table className="data">
            <tr>
              <td><a href="http://www.cesbio.ups-tlse.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/Logo_Cesbio.png" alt="CESBIO"/></a></td>
              <td>Centre d'études spatiales de la Biosphère</td>      
            </tr>	
            <tr>
              <td><a href="http://www.get.obs-mip.fr/international/lmi/lmicefirse"><img width="75px" src="http://80.158.22.249/resources/sco/logos/Logo_cefirse.png" alt="CEFIRSE"/></a></td>
              <td>Cellule franco-indienne de recherche en sciences de l'eau</td>
            </tr>
            <tr>
              <td>CEFIRES</td>
              <td>Cellule Franco-Indienne de recherche sur les eaux souterraines</td>
            </tr>
            <tr>
              <td><a href="http://www.brgm.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/BRGM.png" alt="BRGM"/></a></td>
              <td>Bureau de Recherche Géologique et Minière</td>
            </tr>	
            <tr>
              <td><a href="http://ngri.org.in"><img width="75px" src="http://80.158.22.249/resources/sco/logos/logo_ngri.png" alt="NGRI"/></a></td>
              <td>National Geophysical Research Institute</td>
            </tr>
            <tr>
              <td><a href="http://www.insu.cnrs.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/logo_CNRS_INSU.jpg" alt="CNRS/INSU"/></a></td>
              <td>Institut national des sciences de l'Univers du Centre national de la recherche scientifique</td>
            </tr>
            <tr>
              <td><a href="https://wwz.ifremer.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/Logo-Ifremer.jpg" alt="IFREMER"/></a></td>
              <td>Institut français de recherche pour  exploitation de la mer</td>
            </tr>
            <tr>
              <td><a href="https://cnes.fr"><img width="75px" src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES"/></a></td>
              <td>Centre national d'études spatiales</td>
            </tr>
            <tr>
              <td><a href="http://www.esa.int/ESA"><img width="75px" src="http://80.158.22.249/resources/sco/logos/logo-ESA.png" alt="ESA"/></a></td>
              <td>Agence spatiale européenne</td>
            </tr>
            <tr>
              <td><a href="http://www.aapahinnovations.com"><img width="75px" src="http://80.158.22.249/resources/sco/logos/logo-aapah.png" alt="AAPAH Innovation"/></a></td>
              <td>AAPAH Innovation</td>
            </tr>
	  </table> 

	  <br/><br/><br/>
	  <b>Logiciels:</b>          
	  <table className="data">
	    <tr>
		<td><a href="https://github.com/MizarWeb"><img width="75px" src="https://avatars2.githubusercontent.com/u/27839288?s=200&v=4" alt="MIZAR"/></a></td>
		<td>MIZAR - 3D library</td>
	    </tr>
	    <tr>
		<td><a href="https://github.com/RegardsOss/regards-access">REGARDS</a></td>
		<td>REGARDS access</td>
	    </tr>
	    <tr>
		<td><a href="http://mapserver.org/"><img width="75px" src="http://mapserver.org/_static/banner.png" alt="mapserver"/></a></td>
		<td>MapServer</td>
	    </tr>
	  </table>
          </CardText>
          <CardActions style={HelpPageComponent.actionWrapperStyle}>
            <RaisedButton
              label="Close"
              onClick={this.props.closeHelp}
            />
          </CardActions>
        </div>
      </Modal>
    )
  }
}

export default HelpPageComponent
