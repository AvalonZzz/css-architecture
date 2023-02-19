import Col from 'vant/lib/col'
import 'vant/lib/col/index.css'
import Row from 'vant/lib/row'
import 'vant/lib/row/index.css'
import { CAside, CFooter, CHeader, CLayout, CMain } from './layout'
import CBoxCenter from './boxCenter/CBoxCenter'
import CBoxSkin from './boxSkin/CBoxSkin'
import CSingleCenter from './singleCenter/CSingleCenter'
import CFootNav from './footNav/CFootNav'
import Launch from './launch/Launch'
import Avatar from './avatar'
const components = {
  CRow: Row,
  CCol: Col,
  CLayout: CLayout,
  CFooter: CFooter,
  CHeader: CHeader,
  CAside: CAside,
  CMain: CMain,
  CBoxCenter,
  CBoxSkin,
  CSingleCenter,
  CFootNav,
  Launch,
  Avatar
}

const install = (app) => {
  Object.keys(components).forEach((key) => {
    if (key === 'CRow' || key === 'CCol') {
      app.component(key, components[key])
    } else {
      app.component(components[key].name, components[key])
    }
  })
}

const Mui = {
  install
}

export default Mui
