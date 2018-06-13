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

            <div className="scenario"><b>{this.context.intl.formatMessage({ id: 'page.help.scenario.title' })}</b> <i>{this.context.intl.formatMessage({ id: 'page.help.scenario.palavas.title' })}</i></div>
            {this.context.intl.formatHTMLMessage({ id: 'page.help.scenario.palavas.text' })}


            <div className="institute-partner">
              <a href="http://www.shom.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/shom-logo.jpg" alt="SHOM" /></a>
              <a href="http://www.ign.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/IGN.png" alt="IGN" /></a>
              <a href="https://www.cls.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/cls.png" alt="CLS" /></a>
              <a href="http://grgs.obs-mip.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/GRGS.gif" alt="GRGS" /></a>
              <a href="http://www.cnes.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>
              <a href="http://www.legos.obs-mip.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
              <a href="http://www.cnrs.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/CNRS.jpg" alt="CNRS" /></a>
              <a href="http://www.ird.fr/"><img style={HelpPageComponent.smallerImgStyle} src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="IRD" /></a>
              <a href="http://www.ups-tlse.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/UPS.jpg" alt="UPS" /></a>
              <a href="http://www.obs-mip.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/OMP_logo_CMYK.jpg" alt="OMP" /></a>
              <a href="https://www.aviso.altimetry.fr/en/home.html"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/Logo-AVISO.jpg" alt="AVISO" /></a>
              <a href="http://www.odatis-ocean.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/Logo-Odatis_fullsize.png.jpg" alt="ODATIS" /></a>
              <a href="http://www.brgm.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/BRGM.png" alt="BRGM" /></a>
            </div>
            <Divider />

            <div className="scenario"><b>{this.context.intl.formatMessage({ id: 'page.help.scenario.title' })}</b> <i>{this.context.intl.formatMessage({ id: 'page.help.scenario.niger.title' })}</i></div>
            {this.context.intl.formatHTMLMessage({ id: 'page.help.scenario.niger.text' })}

            <div className="institute-partner">
              <a href="http://www.cnes.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" alt="CNES" /></a>
              <a href="http://www.legos.obs-mip.fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
              <a href="http://www.ird.fr/"><img style={HelpPageComponent.smallerImgStyle} src="http://80.158.22.249/resources/sco/logos/IRD.png" alt="IRD" /></a>
              <a href="http://www.get.obs-mip.fr"><img style={HelpPageComponent.smallerImgStyle} src="http://80.158.22.249/resources/sco/logos/get.png" alt="GET" /></a>
              <a href="http://www.abn.ne/index.php?option=com_content&view=frontpage&Itemid=1&lang=fr"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/LEGOS_NEW.png" alt="LEGOS" /></a>
              <a href="http://www.ufrgs.br/iph/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/IPH.png" alt="Instituto de Pesquisas Hidráulicas" /></a>
              <a href="http://www.aeris-data.fr/"><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/logoAeris.png" alt="AERIS" /></a>
              <a href=""><img style={HelpPageComponent.imgStyle} src="http://80.158.22.249/resources/sco/logos/Swot.jpg" alt="Swot Aval" /></a>
            </div>
            <Divider />
            <div className="scenario"><b>{this.context.intl.formatMessage({ id: 'page.help.scenario.title' })}</b> <i>{this.context.intl.formatMessage({ id: 'page.help.scenario.mont-blanc.title' })}</i></div>
            {this.context.intl.formatHTMLMessage({ id: 'page.help.scenario.mont-blanc.text' })}

            <br />
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
            <div className="scenario"><b>{this.context.intl.formatMessage({ id: 'page.help.scenario.title' })}</b> <i>{this.context.intl.formatMessage({ id: 'page.help.scenario.poyang.title' })}</i></div>
            {this.context.intl.formatHTMLMessage({ id: 'page.help.scenario.poyang.text' })}

            <Divider />
            <div className="scenario"><b>{this.context.intl.formatMessage({ id: 'page.help.scenario.title' })}</b> <i>{this.context.intl.formatMessage({ id: 'page.help.scenario.inde.title' })}</i></div>
            {this.context.intl.formatHTMLMessage({ id: 'page.help.scenario.inde.text' })}

            <br />
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
            <div className="scenario"><b>{this.context.intl.formatMessage({ id: 'page.help.software.title' })}</b></div>

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
