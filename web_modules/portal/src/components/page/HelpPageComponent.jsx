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

  generateTableWith = children => (
    <Table
      fixedHeader={false}
      fixedFooter={false}
      selectable={false}
    >
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}
      >
        <TableRow>
          <TableHeaderColumn>Institut</TableHeaderColumn>
          <TableHeaderColumn>Label</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        deselectOnClickaway={false}
      >
        {children}
      </TableBody>
    </Table>
  )

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

            <br /><br /><br />

            <b>Scénario:</b><i>Du changement global aux impacts locaux</i>
            {this.generateTableWith([
              <TableRow key="a">
                <TableRowColumn><a href="http://marine.copernicus.eu/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/cartouche-weather-climate.jpg" alt="Marine Copernicus" /></a></TableRowColumn>
                <TableRowColumn>COPERNICUS MARINE ENVIRONMENT MONITORING SERVICE</TableRowColumn>
              </TableRow>,
            ])}

            <Divider />

            <br /><br /><br />

            <b>Scénario:</b> <i>Palavas-les-Flots sous surveillance</i>

            {this.generateTableWith([
              <TableRow key="aa">
                <TableRowColumn>
                  <a href="http://www.legos.obs-mip.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Laboratoire d’études en géophysique et océanographie spatiales
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ab">
                <TableRowColumn>
                  <a href="http://www.cnes.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Centre National d'Etudes Spatiales
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ac">
                <TableRowColumn>
                  <a href="http://www.cnrs.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" alt="CNRS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Centre National de la Recherche Scientifique
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ad">
                <TableRowColumn>
                  <a href="http://www.ird.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="IRD" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Institut de Recherche pour le Développement
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ae">
                <TableRowColumn>
                  <a href="http://www.ups-tlse.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/UPS.jpg" alt="UPS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Université Paul Sabatier
                </TableRowColumn>
              </TableRow>,

              <TableRow key="af">
                <TableRowColumn>
                  <a href="http://www.obs-mip.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/OMP_logo_CMYK.jpg" alt="OMP" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Observatoire Midi-Pyrénées
                </TableRowColumn>
              </TableRow>,


              <TableRow key="ag">
                <TableRowColumn>
                  <a href="https://www.aviso.altimetry.fr/en/home.html"><img height="75px" src="http://80.158.22.249/resources/sco/logos/Logo-AVISO.jpg" alt="AVISO" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  AVISO
                </TableRowColumn>
              </TableRow>,


              <TableRow key="ah">
                <TableRowColumn>
                  <a href="http://www.odatis-ocean.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/Logo-Odatis_fullsize.png.jpg" alt="ODATIS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Données et services pour 'océan
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ai">
                <TableRowColumn>
                  <a href="http://www.brgm.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/BRGM.png" alt="BRGM" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Bureau de recherches géologiques et minières
                </TableRowColumn>
              </TableRow>,

              <TableRow key="aj">
                <TableRowColumn>
                  <a href="http://grgs.obs-mip.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/GRGS.gif" alt="GRGS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Groupe de recherche de géodésie spatiale
                </TableRowColumn>
              </TableRow>,


              <TableRow key="ak">
                <TableRowColumn>
                  <a href="https://www.cls.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/cls.png" alt="CLS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Collecte localisation services
                </TableRowColumn>
              </TableRow>,

              <TableRow key="al">
                <TableRowColumn>
                  <a href="http://www.ign.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/IGN.png" alt="IGN" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Institut national de l’information géographique et forestière
                </TableRowColumn>
              </TableRow>,


              <TableRow key="am">
                <TableRowColumn>
                  <a href="http://www.shom.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/shom-logo.jpg" alt="SHOM" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Service hydrographique et océanographique de la marine
                </TableRowColumn>
              </TableRow>,
            ])}

            <Divider />

            <br /><br /><br />

            <b>Scénario:</b> <i>Tous les chemins de l'eau mènent à Niamey</i>

            {this.generateTableWith([
              <TableRow key="ba">
                <TableRowColumn>
                  <a href="http://www.get.obs-mip.fr">GET</a>
                </TableRowColumn>
                <TableRowColumn>
                  Laboratoire d’études en géophysique et océanographie spatiales
                </TableRowColumn>
              </TableRow>,
              <TableRow key="bb">
                <TableRowColumn>
                  <a href="http://www.legos.obs-mip.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Laboratoire d’études en géophysique et océanographie spatiales
                </TableRowColumn>
              </TableRow>,
              <TableRow key="bc">
                <TableRowColumn>
                  <a href="http://www.cnes.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Centre National d'Etudes Spatiales
                </TableRowColumn>
              </TableRow>,
              <TableRow key="bd">
                <TableRowColumn>
                  <a href="http://www.cnrs.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" alt="CNRS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Centre National de la Recherche Scientifique
                </TableRowColumn>
              </TableRow>,

              <TableRow key="be">
                <TableRowColumn>
                  <a href="http://www.cnrs.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="CNRS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Institut de Recherche pour le Développement
                </TableRowColumn>
              </TableRow>,

              <TableRow key="bf">
                <TableRowColumn>
                  <a href="http://www.ups-tlse.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/UPS.jpg" alt="UPS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Université Paul Sabatier
                </TableRowColumn>
              </TableRow>,

              <TableRow key="bg">
                <TableRowColumn>
                  <a href="http://www.obs-mip.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/OMP_logo_CMYK.jpg" alt="OMP" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Observatoire Midi-Pyrénées
                </TableRowColumn>
              </TableRow>,

              <TableRow key="bh">
                <TableRowColumn>
                  <a href="http://www.abn.ne/index.php?option=com_content&view=frontpage&Itemid=1&lang=fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Autorité du Bassin du Niger
                </TableRowColumn>
              </TableRow>,

              <TableRow key="bi">
                <TableRowColumn>
                  IPH
                </TableRowColumn>
                <TableRowColumn>
                  Instituto des pesquisas Hydraulicas ; Universidad federal de Rio Grande do Sur
                </TableRowColumn>
              </TableRow>,

              <TableRow key="bj">
                <TableRowColumn>
                  <img height="75px" src="http://80.158.22.249/resources/sco/logos/Swot.jpg" alt="Swot" />
                </TableRowColumn>
                <TableRowColumn>
                  SWOT Aval
                </TableRowColumn>
              </TableRow>,
              <TableRow key="bk">
                <TableRowColumn>
                  <img height="75px" src="http://80.158.22.249/resources/sco/logos/logoAeris.png" alt="AERIS" />
                </TableRowColumn>
                <TableRowColumn>
                  AERIS
                </TableRowColumn>
              </TableRow>,
            ])}


            <Divider />

            <br /><br /><br />

            <b>Scénario:</b> <i>La perte d'altitude du Mont-Blanc</i>

            {this.generateTableWith([
              <TableRow key="ca">
                <TableRowColumn>
                  <a href="http://www.legos.obs-mip.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Laboratoire d'études en géophysique et océanographie spatiales
                </TableRowColumn>
              </TableRow>,
              <TableRow key="cb">
                <TableRowColumn>
                  <a href="http://www.cnes.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Centre National d'Etudes Spatiales
                </TableRowColumn>
              </TableRow>,
              <TableRow key="cc">
                <TableRowColumn>
                  <a href="http://www.cnrs.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" alt="CRNS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Centre National de la Recherche Scientifique
                </TableRowColumn>
              </TableRow>,
              <TableRow key="cd">
                <TableRowColumn>
                  <a href="http://www.ird.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="IRD" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Institut de Recherche pour le Développement
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ce">
                <TableRowColumn>
                  <a href="http://www.ups-tlse.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/UPS.jpg" alt="UPS" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Université Paul Sabatier
                </TableRowColumn>
              </TableRow>,
              <TableRow key="cf">
                <TableRowColumn>
                  <a href="http://www.obs-mip.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/OMP_logo_CMYK.jpg" alt="OMP" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Observatoire Midi-Pyrénées
                </TableRowColumn>
              </TableRow>,
              <TableRow key="cg">
                <TableRowColumn>
                  <a href="http://www.ige-grenoble.fr/"><img height="75px" src="http://80.158.22.249/resources/sco/logos/IGE.png" alt="IGE" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Institut des géosciences de l'environnement
                </TableRowColumn>
              </TableRow>,
            ])}


            <Divider />

            <br /><br /><br />

            <b>Scénario:</b> <i>TODO POYANG</i>

            {this.generateTableWith([
              <TableRow key="da">
                <TableRowColumn>
                  <a href="http://www.cesbio.ups-tlse.fr">TODO</a>
                </TableRowColumn>
                <TableRowColumn>
                  TODO
                </TableRowColumn>
              </TableRow>,
            ])}


            <Divider />

            <br /><br /><br />

            <b>Scénario:</b> <i>Anticiper la sécheresse agronomique de l'Inde</i>

            {this.generateTableWith([
              <TableRow key="ea">
                <TableRowColumn>
                  <a href="http://www.cesbio.ups-tlse.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/Logo_Cesbio.png" alt="CESBIO" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Centre d'études spatiales de la Biosphère
                </TableRowColumn>
              </TableRow>,
              <TableRow key="eb">
                <TableRowColumn>
                  <a href="http://www.get.obs-mip.fr/international/lmi/lmicefirse"><img height="75px" src="http://80.158.22.249/resources/sco/logos/Logo_cefirse.png" alt="CEFIRSE" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Cellule franco-indienne de recherche en sciences de l'eau
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ec">
                <TableRowColumn>
                  CEFIRES
                </TableRowColumn>
                <TableRowColumn>
                  Cellule Franco-Indienne de recherche sur les eaux souterraines
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ed">
                <TableRowColumn>
                  <a href="http://www.brgm.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/BRGM.png" alt="BRGM" /></a>

                </TableRowColumn>
                <TableRowColumn>
                  Bureau de Recherche Géologique et Minière
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ee">
                <TableRowColumn>
                  <a href="http://ngri.org.in"><img height="75px" src="http://80.158.22.249/resources/sco/logos/logo_ngri.png" alt="NGRI" /></a>

                </TableRowColumn>
                <TableRowColumn>
                  National Geophysical Research Institute
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ef">
                <TableRowColumn>
                  <a href="http://www.insu.cnrs.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/logo_CNRS_INSU.jpg" alt="CNRS/INSU" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Institut national des sciences de l'Univers du Centre national de la recherche scientifique
                </TableRowColumn>
              </TableRow>,
              <TableRow key="eg">
                <TableRowColumn>
                  <a href="https://wwz.ifremer.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/Logo-Ifremer.jpg" alt="IFREMER" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Institut français de recherche pour  exploitation de la mer
                </TableRowColumn>
              </TableRow>,
              <TableRow key="eh">
                <TableRowColumn>
                  <a href="https://cnes.fr"><img height="75px" src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Centre national d'études spatiales
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ei">
                <TableRowColumn>
                  <a href="http://www.esa.int/ESA"><img height="75px" src="http://80.158.22.249/resources/sco/logos/logo-ESA.png" alt="ESA" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  Agence spatiale européenne
                </TableRowColumn>
              </TableRow>,
              <TableRow key="ej">
                <TableRowColumn>
                  <a href="http://www.aapahinnovations.com"><img height="75px" src="http://80.158.22.249/resources/sco/logos/logo-aapah.png" alt="AAPAH Innovation" /></a>
                </TableRowColumn>
                <TableRowColumn>
                  AAPAH Innovation
                </TableRowColumn>
              </TableRow>,
            ])}

            <br /><br /><br />
            <b>Logiciels:</b>

            <Table
              fixedHeader={false}
              fixedFooter={false}
              selectable={false}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn />
                  <TableHeaderColumn>Label</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={false}
              >
                <TableRow>
                  <TableRowColumn>
                    <a href="https://github.com/MizarWeb"><img width="75px" src="http://80.158.22.249/resources/sco/logos/mizar.png" alt="MIZAR" /></a>
                  </TableRowColumn>
                  <TableRowColumn>
                    MIZAR - 3D library
                  </TableRowColumn>
                </TableRow>

                <TableRow>
                  <TableRowColumn>
                    <a href="https://github.com/RegardsOss/regards-frontend"><img height="75px" src="http://80.158.22.249/resources/sco/logos/regards.png" alt="Regards-frontend" />				</a>
                  </TableRowColumn>
                  <TableRowColumn>
                    SCO shares its software core with REGARDS
                  </TableRowColumn>
                </TableRow>

                <TableRow>
                  <TableRowColumn>
                    <a href="http://mapserver.org/"><img width="75px" src="http://mapserver.org/_static/banner.png" alt="mapserver" /></a>
                  </TableRowColumn>
                  <TableRowColumn>
                    MapServer
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>

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
