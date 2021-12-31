import { useCallback } from 'react'
import { useToast } from '@chakra-ui/react'

import Airtable from 'airtable'

const tableName = 'Satchel Waitlist Emails'

const useAirtable = () => {
  const toast = useToast()

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
      toast({
        title: 'Joined waitlist!',
        description: `${email} was succesfully added to the waitlist`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    },
    [base],
  )

  return { base, onAddEmail: handleAddEmail }
}

export default useAirtable
