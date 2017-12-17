import * as React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

import { tomorrowNight } from 'react-syntax-highlighter/dist/styles/hljs'
import { Col, Row } from 'react-flexbox-grid'

const code = `
  export type AddTodo {
    type: 'TODO_ADD',
    payload: Todo
  }
  export const AddTodo =
    (todo: Todo) => ({ type: 'TODO_ADD', payload: todo })
`

export default () => (
  <div style={{fontSize: '1em'}}>
    <Row>
      <Col xs={12} sm={12} md={10} lg={8} xl={6} mdOffset={1} lgOffset={2} xlOffset={3}>
        <SyntaxHighlighter
          wrapLines
          language="typescript"
          style={tomorrowNight}
          customStyle={{
            maxWidth: '95vw',
            textOverflow: 'hidden',
            fontSize: '0.5em',
            textAlign: 'left'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Col>
    </Row>
  </div>
)
