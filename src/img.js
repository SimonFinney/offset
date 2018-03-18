// TODO: Document

const convert = file =>
  `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

module.exports = { convert };
