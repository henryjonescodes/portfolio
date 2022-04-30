import SiteNav from "@components/dev-nav/SiteNav"
import css2 from "@pages/pages.module.scss"
import css from "./svg-tracing.module.scss"
import NameSvg from "./Name.svg"
import Traced from "./Traced/Traced"
import { motion } from "framer-motion"

const pageStyles = css2 as any
const styles = css as any

const SvgTracing = () => {
  return (
    <div className={pageStyles.pageSvgTracing}>
      <SiteNav showToolbar={false} />
      <div className={styles.pageWrapper}>
        <Traced.div
          cornerRadius={23}
          strokeWidth={10}
          color="#ff0000"
          contentClassName={styles.wrapwrap}
        >
          <Traced.div cornerRadius={20} strokeWidth={16}>
            <img src={"./Name.svg"} style={styles.tracedName} />
          </Traced.div>
        </Traced.div>
        {/* <Traced.span>
          <Traced.div cornerRadius={30}>
            <h4>tesssteroo</h4>
          </Traced.div>
          <h4>tesssteroo</h4>
        </Traced.span> */}
      </div>
    </div>
  )
}

export default SvgTracing
