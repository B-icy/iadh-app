"use client"

import styles from './page.module.css'
import Button from '@mui/material/Button';
import DateCalendar from '@mui/x-date-pickers';
// className={styles.main}

export default function Home() {
  return (
    <main>
      <div>
        <p>
          Welcome In!
        </p>
      </div>
    <Button variant="contained"> Hello World </Button>
    </main>
  )
}
