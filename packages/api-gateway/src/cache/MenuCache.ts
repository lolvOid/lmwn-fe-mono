import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 500});

export default cache;
