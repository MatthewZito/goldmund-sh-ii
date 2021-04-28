const { join } = require('path');
const fs = require('fs');

const matter = require('gray-matter');

const basePath = 'src/pages/blog/';
const lookBehind = /(?<=\/blog\/).*$/;
const ext = '.md';

const extractor = _ => _.match(lookBehind);

const frontmatter = /---(.|\n)*?---/;

export function resolver (rte) {

  const filePath = join(__dirname, rte);
  const raw = fs.readFileSync(filePath).toString().match(frontmatter)[0];

  const { data } = matter(raw);
  return data;
}
