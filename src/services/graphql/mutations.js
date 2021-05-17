//  TODO add input types

/**
 * @summary Create a contact message
 */
export const CREATE_MESSAGE = `
  mutation CreateMessage(
    $email: String!,
    $subject: String!,
    $body: String!
  ) {
    createMessage(
      email: $email,
      subject: $subject,
      body: $body
    ) {
      email
      subject
      body
    }
  }
`;

/**
 * @summary Create an event log; stringified, sent via `sendBeacon`
 */
export const CREATE_EVENT = `
  mutation CreateEvent(
    $type: String!,
    $category: String!,
    $info: String!
  ) {
    createEvent(
      type: $type,
      category: $category,
      info: $info
    ) {
      type
      category
      info
    }
  }
`;
