// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

test('app shows random fact and image', async ({ page }) => {
  // Ruta a la que tiene que ir
  await page.goto(LOCALHOST_URL);

  // Como la aplicacion que creamos en las etiquetas que se utilizan
  // no se tienen clases ni ids las obtenemos de la siguiente manera
  // TODO funciona con promesas NO OLVIDAR AWAIT

  // Obtenemos el primer parrafo <p> que encuentre
  const text = await page.getByRole('paragraph')
  // Obtenemos la primera imagen <img> que encuentre
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imgSrc = await image.getAttribute('src')

  // Revisamos que es lo que se obtiene
  console.log({ textContent, imgSrc })

  // LOGICA
  // Esperamos que el textConten no se null o al menos no sea null o la cadena vacia
  await expect(textContent?.length).toBeGreaterThan(0)
  // Esperamos que la imagen comience con el prefijo
  await expect(imgSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()

  // Probocamos que no pase el test cambiando el prefijo que se espera
  // await expect(imgSrc?.startsWith('prueba')).toBeTruthy()

});