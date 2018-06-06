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
  static contextTypes = {
    intl: PropTypes.object,
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
        hasSubtitle={false}
      >
        <div>
          <CardText>

            <b>{scoBuildInfos}</b>

            <p>
              <b>Scenario:</b><i> Du changement global aux impacts locaux</i>
              <table className="data">
                <tr>
                  <td><a href="http://marine.copernicus.eu/"><img width="100px" src="http://80.158.22.249/resources/sco/logos/cartouche-weather-climate.jpg" /></a></td>
                  <td>COPERNICUS MARINE ENVIRONMENT MONITORING SERVICE</td>
                </tr>
              </table>

              <p>
                <b>Scenario:</b> <i>Palavas-les-Flots sous surveillance</i>
                <table className="data">
                  <tr>
                    <td colSpan="2"><a href="http://www.legos.obs-mip.fr"><img width="100px" src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" /></a></td>
                    <td>Laboratoire d’études en géophysique et océanographie spatiales</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td><a href="http://www.cnes.fr/">CNES</a></td>
                    <td>Centre National d'Etudes Spatiales</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td><a href="http://www.cnrs.fr/"><img width="100px" src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" /></a></td>
                    <td>Centre National de la Recherche Scientifique</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td><a href="http://www.cnrs.fr/"><img width="100px" src="http://80.158.22.249/resources/sco/logos/IRD.png" /></a></td>
                    <td>Institut de Recherche pour le Développement</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td><a href="http://www.ups-tlse.fr/"><img width="100px" src="http://80.158.22.249/resources/sco/logos/UPS.jpg" /></a></td>
                    <td>Université Paul Sabatier</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td><a href="http://www.obs-mip.fr/"><img width="100px" src="http://80.158.22.249/resources/sco/logos/OMP_logo_CMYK.jpg" /></a></td>
                    <td>Observatoire Midi-Pyrénées</td>
                  </tr>
                  <tr>
                    <td colSpan="2"><a href="https://www.aviso.altimetry.fr/en/home.html"><img width="100px" src="http://80.158.22.249/resources/sco/logos/Logo-AVISO.jpg" /></a></td>
                    <td>AVISO</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td><a href="http://www.odatis-ocean.fr"><img width="100px" src="http://80.158.22.249/resources/sco/logos/Logo-Odatis_fullsize.png.jpg" /></a></td>
                    <td>Données et services pour l’océan</td>
                  </tr>
                  <tr>
                    <td><a href="http://www.brgm.fr"><img width="100px" src="http://80.158.22.249/resources/sco/logos/BRGM.png" /></a></td>
                    <td>Bureau de recherches géologiques et minières</td>
                  </tr>
                  <tr>
                    <td><a href="http://grgs.obs-mip.fr"><img width="100px" src="http://80.158.22.249/resources/sco/logos/GRGS.gif" /></a></td>
                    <td>Groupe de recherche de géodésie spatiale</td>
                  </tr>
                  <tr>
                    <td><a href="https://www.cls.fr"><img width="100px" src="http://80.158.22.249/resources/sco/logos/cls.png" /></a></td>
                    <td>Collecte localisation services</td>
                  </tr>
                  <tr>
                    <td><a href="http://www.ign.fr"><img width="100px" src="http://80.158.22.249/resources/sco/logos/IGN.png" /></a></td>
                    <td>Institut national de l’information géographique et forestière</td>
                  </tr>
                  <tr>
                    <td><a href="http://www.shom.fr"><img width="100px" src="http://80.158.22.249/resources/sco/logos/shom-logo.jpg" /></a></td>
                    <td>Service hydrographique et océanographique de la marine</td>
                  </tr>
                </table>

                <p>
                  Scenario: UNE RECRUSDESCENCE DES INONDATIONS
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

                  Scenario: TODO Mont-blanc
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

                  Scenario: TODO POYANG
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

                  Scenario: Monitorer l eau et la secheresse
                  <table className="data">
                    <tr>
                      <th>Institute</th>
                      <th>Label</th>
                    </tr>
                    <tr>
                      <td><a href="http://www.cesbio.ups-tlse.fr">CESBIO</a></td>
                      <td>Centre d études spatiales de la Biosphèr(Toulouse, France)</td>
                    </tr>
                    <tr>
                      <td><a href="http://www.get.obs-mip.fr/international/lmi/lmicefirse">CEFIRSE</a></td>
                      <td>Cellule franco-indienne de recherche en sciences de l eau (Inde)</td>
                    </tr>
                    <tr>
                      <td>CEFIRES</td>
                      <td>Cellule Franco-Indienne de recherche sur les eaux souterraines (Inde)</td>
                    </tr>
                    <tr>
                      <td><a href="http://www.brgm.fr">BRGM</a></td>
                      <td>Bureau de Recherche Géologique et Minière (France)</td>
                    </tr>
                    <tr>
                      <td><a href="http://ngri.org.in">NGRI</a></td>
                      <td>National Geophysical Research Institute (Inde)</td>
                    </tr>
                    <tr>
                      <td><a href="http://www.insu.cnrs.fr">INSU-CNRS</a></td>
                      <td>Institut national des sciences de l Univers du Centre national de la recherche scientifique (France)</td>
                    </tr>
                    <tr>
                      <td><a href="https://wwz.ifremer.fr">Ifremer</a></td>
                      <td>Institut français de recherche pour  exploitation de la mer (France)</td>
                    </tr>
                    <tr>
                      <td><a href="https://cnes.fr">CNES</a></td>
                      <td>Centre national d’études spatiales (France)</td>
                    </tr>
                    <tr>
                      <td><a href="http://www.esa.int/ESA">ESA</a></td>
                      <td>Agence spatiale européenne (Paris, France)</td>
                    </tr>
                    <tr>
                      <td><a href="http://www.aapahinnovations.com">AAPAH Innovation</a></td>
                      <td>AAPAH Innovation</td>
                    </tr>
                  </table>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.<br />
                </p>
              </p>
            </p>
          </CardText>
          <CardActions style={HelpPageComponent.actionWrapperStyle}>
            <RaisedButton
              label={this.context.intl.formatMessage({ id: 'page.actions.close' })}
              onClick={this.props.closeHelp}
            />
          </CardActions>
        </div>
      </Modal>
    )
  }
}

export default HelpPageComponent
