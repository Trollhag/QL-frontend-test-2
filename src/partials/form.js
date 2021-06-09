import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Column, Grid } from '../styled/Grid';

function formFields(a) {
  return a.reduce((v, field) => {
    if (field instanceof Array) {
      const { structure, fields } = formFields(field)
      return {
        structure: [
          ...v.structure,
          structure
        ],
        fields: {
          ...v.fields,
          ...fields,
        }
      }
    }
    return {
      structure: [
        ...v.structure,
        field.key,
      ],
      fields: {
        ...v.fields,
        [field.key]: field
      }
    }
  }, {})
}

export function useForm(initialForm) {
  const [values, setValues] = useState(null);
  const [fields, setFields] = useState({});
  const [structure, setStructure] = useState(null)
  const form = useMemo(() => initialForm.reduce(row => formFields(row),), [initialForm])

  useEffect(() => {
    setStructure(form.structure)
  }, [form.structure])

  useEffect(() => {
    setFields(Object.values(form.fields).map(field => ({ ...field, ...(fields[field.key] || {}) })))
  }, [form.fields, fields])

  useEffect(() => {
    setValues({ ...Object.values(form.fields).map(field => field.defaultValue), ...values })
  }, [form.fields, values])

  const updateField = useCallback((key, newFieldData) => {
    setFields({
      ...fields,
      [key]: {
        ...fields[key],
        newFieldData,
      }
    })
    if ('value' in newFieldData) {
      setValues({
        ...values,
        [key]: newFieldData.value,
      })
    }
  }, [values, setValues, fields, setFields])
  return { values, fields, structure, updateField }
}

export default function Form({ form: initialForm }) {
  const form = useForm(initialForm);
  return (
    <Form.Render {...form} />
  )
}
Form.Render = function (props) {
  const { structure, fields, values, updateField } = props
  return (
    <Grid>
      {structure.map((field) => field instanceof Array ? <Form.Render {...props} structure={field} /> : (
        <Column width={100 / structure}>
        </Column>
      ))}
    </Grid>
  )
}