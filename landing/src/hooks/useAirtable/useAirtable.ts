import { useCallback } from 'react'

import Airtable from 'airtable'

const tableName = 'Satchel Waitlist Emails'

const useAirtable = () => {
  const base = new Airtable({
    apiKey: process.env.REACT_APP_AIRTABLE_KEY,
  }).base('appg0zTJZMqO0WzR4')

  const handleAddEmail = useCallback(
    (email: string) => {
      base(tableName).create(
        [
          {
            fields: {
              Email: email,
            },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err)
            return
          }
          if (!records) return
          records.forEach(function (record) {
            console.log(record.getId())
          })
        },
      )
    },
    [base],
  )

  return { base, onAddEmail: handleAddEmail }
}

export default useAirtable
