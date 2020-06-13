import url from './URL';

//flatten
export function flattenProducts(data)
{
    return data.map(item => {
        //let image = (item.image && item.image.url) || null;

        // local setup no deployment
        let image = `${url}${item.image.url}`;
        return { ...item, image };
    })
}

//helper function
export function featuredProducts(data)
{
    return data.filter(item => {
        return item.featured === true;
    })
}