export default function ({
  ok = false,
  status,
  error = 'An error occurred while processing the request',
  data = null
}) {
  return {
    ok,
    status,
    error,
    data
  };
}
