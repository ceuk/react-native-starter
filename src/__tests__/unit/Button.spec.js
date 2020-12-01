import React from 'react'
import { render } from '@testing-library/react-native'
import Button from '../../components/Button'

describe('<Button />', () => {
  const { getByTestId: $ } = render(<Button testID="button" text="testing" />)

  assert({
    given: 'some jsx',
    should: 'render markup',
    actual: $('button')?.props?.children[0][1]?.props?.children,
    expected: 'testing'
  })
})
