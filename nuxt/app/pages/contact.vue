<script setup lang="ts">
import { countries } from '../data/countries'
useHead({ title: 'Contact — VIVE' })
const asset = useAsset()
const form = reactive({ firstName: '', lastName: '', email: '', region: '', phone: '', company: '', message: '', consent: false })
const prepared = ref(false)
const policy = ref<HTMLDialogElement | null>(null)
const mailLink = computed(() => 'mailto:info@vivewheels.com?subject=' + encodeURIComponent(`Website inquiry — ${form.firstName} ${form.lastName}`) + '&body=' + encodeURIComponent(`Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nRegion: ${form.region}\nPhone: ${form.phone}\nCompany: ${form.company}\n\n${form.message}`))
watch(form, () => { prepared.value = false })
</script>
<template>
  <InnerPage :upgrade="false" class="contact-page">
    <section class="contact-intro"><MotionTitle as="h1" text="CONTACTS" /><p data-reveal="fade">Would you like to receive more information about our products or would you like to talk to us about a customised project?</p></section>
    <form class="contact-form" @submit.prevent="prepared = true" data-reveal="fade">
      <div class="contact-fields">
        <label>First name*<input v-model="form.firstName" name="given-name" autocomplete="given-name" required maxlength="100" /></label>
        <label>Last name*<input v-model="form.lastName" name="family-name" autocomplete="family-name" required maxlength="100" /></label>
        <label>E-mail*<input v-model="form.email" type="email" name="email" autocomplete="email" required maxlength="200" /></label>
        <div class="contact-country"><span>Country / Region</span><DarkSelect v-model="form.region" :options="countries" label="Country / Region" placeholder="" /><input type="hidden" name="country-name" :value="form.region" /></div>
        <label class="contact-wide">Phone<input v-model="form.phone" type="tel" name="tel" autocomplete="tel" maxlength="40" /></label>
        <label class="contact-wide">Company<input v-model="form.company" name="organization" autocomplete="organization" maxlength="150" /></label>
      </div>
      <div class="contact-message"><label>Message<textarea v-model="form.message" name="message" maxlength="3000" /></label>
        <div class="contact-submit-row"><label class="contact-consent"><input v-model="form.consent" type="checkbox" required /><span>I declare that I have read and accept the <button type="button" aria-label="Privacy Policy" @click="policy?.showModal()">Privacy Policy</button> on the processing of personal data.</span></label><button class="contact-submit wipe-control is-filled" type="submit"><span>SUBMIT</span><ArrowIcon /></button></div>
        <div v-if="prepared" class="contact-draft" role="status">Your message has not been sent. <a :href="mailLink">Open your email app to review and send →</a></div>
      </div>
    </form>
    <section class="contact-location">
      <MotionTitle text="WHERE TO FIND US" /><p class="contact-support" data-reveal="fade">VIVE will continue to provide users with professional support, including vehicle compatibility advice, installation guidance, usage instructions, maintenance recommendations, and after-sales service.</p>
      <div class="contact-info" data-reveal="fade"><h3>CONTACT US：</h3><p><a href="mailto:info@vivewheels.com">info@vivewheels.com</a><br /><a href="tel:+19499786024">+1 (949) 978-6024</a></p><h3>HOURS：</h3><p>Mon - Sat: 9 AM - 5 PM</p><h3>LOCATION：</h3><p>Irvine，California United States</p><div class="contact-socials" role="img" aria-label="Facebook, X and TikTok"><img :src="asset('editorial/8386d.svg')" alt="" /><svg class="contact-social-x" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg></div></div>
      <!-- City-centre marker only: a street address has not been supplied. -->
      <div class="contact-map" data-reveal="lift"><iframe title="Google Maps — Irvine, California" src="https://www.google.com/maps?q=33.6859277%2C-117.7913693&amp;z=12&amp;hl=en&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen /></div>
      <a class="contact-map-link" href="https://www.google.com/maps/search/?api=1&query=Irvine%2C%20California" target="_blank" rel="noopener noreferrer">View Irvine on Google Maps <ArrowIcon /></a>
    </section>
    <dialog ref="policy" class="contact-policy"><h2>Privacy notice — preview</h2><p>This preview does not send or store form entries on a server. SUBMIT prepares an email draft; you choose whether to open your email application and send it to info@vivewheels.com.</p><p>The final VIVE privacy policy must be supplied before enabling direct online form submission.</p><button type="button" class="outline-button" @click="policy?.close()">CLOSE</button></dialog>
  </InnerPage>
</template>
