"use client"

import React from 'react'
import Image from 'next/image'
import styles from './OdooSection.module.css'

const OdooSection = () => {
  return (
    <>
        <section className={styles.section}>
            <div className={styles.mockup}>
                <Image className={styles.img} src="/images/sectionImages/OdooSection.png" alt="iPad showing the Pro Miller mill monitoring dashboard" width={900} height={500} />
            </div>
            <div className={styles.copy}>
                <h2><span className={styles.grad1}>See Your</span> <span className={styles.grad2}>Whole Mill</span> in One Screen</h2>
                <p>A 20-second look at how a mill owner checks their entire operation — before their first cup of chai.</p>
            </div>
        </section>
    </>
  )
}

export default OdooSection
