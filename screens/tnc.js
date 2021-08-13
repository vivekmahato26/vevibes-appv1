import React from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Theme from "../constants/theme";

const { COLORS, FONTS } = Theme;

export default function Terms({ navigation }) {
    return (
        <View style={{ margin: 10, flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Icon name="chevron-left" style={{ ...FONTS.h2, color: COLORS.primary }} onPress={() => navigation.goBack()} />
                <Text style={{ ...FONTS.body2,fontWeight: 'bold', color: COLORS.primary }}>Terms &amp; Conditions</Text>
            </View>
            <ScrollView>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.head}>DELIVERY TERMS</Text>
                    <Text style={styles.para}>
                        Any perishable goods purchased on a Friday will be shipped out on Monday for Tuesday delivery unless the option for Saturday delivery is chosen.
                    </Text>
                    <Text style={styles.para}>
                        For further and more in-depth information please review our Delivery Policy.
                    </Text>
                    <Text style={styles.head}>OVERVIEW</Text>
                    <Text style={styles.para}>This website is operated by VEVIBES LTD. Throughout the site, the terms “we”, “us” and “our” refer to VEVIBES LTD. VEVIBES LTD offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</Text>
                    <Text style={styles.para}>By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.</Text>
                    <Text style={styles.para}>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.</Text>
                    <Text style={styles.para}>Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</Text>
                    <Text style={styles.head}>ONLINE STORE TERMS</Text>
                    <Text style={styles.para}>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</Text>
                    <Text style={styles.para}>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</Text>
                    <Text style={styles.para}>You must not transmit any worms or viruses or any code of a destructive nature.</Text>
                    <Text style={styles.para}>A breach or violation of any of the Terms will result in an immediate termination of your Services.</Text>
                    <Text style={styles.head}>GENERAL CONDITIONS</Text>
                    <Text style={styles.para}>We reserve the right to refuse service to anyone for any reason at any time.</Text>
                    <Text style={styles.para}>You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</Text>
                    <Text style={styles.para}>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</Text>
                    <Text style={styles.para}>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</Text>
                    <Text style={styles.head}>ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</Text>
                    <Text style={styles.para}>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.</Text>
                    <Text style={styles.para}>This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.</Text>
                    <Text style={styles.head}>MODIFICATIONS TO THE SERVICE AND PRICES</Text>
                    <Text style={styles.para}>Prices for our products are subject to change without notice.</Text>
                    <Text style={styles.para}>We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</Text>
                    <Text style={styles.para}>We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</Text>
                    <Text style={styles.head}>PRODUCTS OR SERVICES</Text>
                    <Text style={styles.para}>We ensure that the information provided in relation to allergens is 100% accurate and we cannot be held liable for any inaccuracies there may be. If you have any queries please do not hesitate to contact us on
                        <Text style={styles.para}> info@vevibes.com.</Text>
                    </Text>
                    <Text style={styles.para}>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</Text>
                    <Text style={styles.para}>We have made every effort to display as accurately as possible the colours and images of our products that appear at the store. We cannot guarantee that your computer monitor’s display of any colour will be accurate.</Text>
                    <Text style={styles.para}>We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.</Text>
                    <Text style={styles.para}>We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.</Text>
                    <Text style={styles.head}>ACCURACY OF BILLING AND ACCOUNT INFORMATION</Text>
                    <Text style={styles.para}>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.</Text>
                    <Text style={styles.para}>You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</Text>
                    <Text style={styles.para}>For more detail, please review our Delivery &amp; Returns Policy.</Text>
                    <Text style={styles.head}>YOUR RIGHTS TO CANCEL</Text>
                    <Text style={styles.para}>The meaning of
                        <Text style={[styles.para,{color:COLORS.green}]}> “Perishable Items” </Text>
                        for the purposes of these terms and conditions means:
                    </Text>
                    <View style={[styles.flexBox,{alignItems:"flex-start"}]}>
                        <Icon name="circle" style={styles.circle}/>
                        <Text style={styles.para}>Chilled and frozen food products.</Text>
                    </View>
                    <View style={[styles.flexBox,{alignItems:"flex-start"}]}>
                        <Icon name="circle" style={styles.circle}/>
                        <Text style={styles.para}>Fresh products (e.g. bread, cakes and pastries, etc.)</Text>
                    </View>
                    <View style={[styles.flexBox,{alignItems:"flex-start"}]}>
                        <Icon name="circle" style={styles.circle}/>
                        <Text style={styles.para}>Food products that contain a ‘best before’, ‘best before end’ or ‘expiry date’ that due to the nature of the product is less than four (4) weeks from the date of delivery</Text>
                    </View>
                    <Text style={styles.para}>Subject to the below paragraphs you have a legal right to change your mind within 14 days and receive a refund. These rights are set out under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.</Text>
                    <Text style={styles.para}>Your right as a consumer to change your mind does not apply in respect of:</Text>
                    <View style={[styles.flexBox,{alignItems:"flex-start"}]}>
                        <Icon name="circle" style={styles.circle}/>
                        <Text style={styles.para}>Products sealed for health protection or hygiene purposes, once these have been unsealed after you receive them;</Text>
                    </View>
                    <View style={[styles.flexBox,{alignItems:"flex-start"}]}>
                        <Icon name="circle" style={styles.circle}/>
                        <Text style={styles.para}>Perishable Items; and any products which become mixed inseparably with other items after their delivery.</Text>
                    </View>
                    <Text style={styles.para}>For purchases of goods you have 14 days after the day you (or someone you nominate) receives the goods, unless your goods are split into several deliveries over different days, in which case you have until 14 days after the day you (or someone you nominate) receives the last delivery.</Text>
                    <Text style={styles.para}>Even if we are not at fault and you do not have the right to change your mind you can still end the contract before it is completed, but you may have to pay us compensation. A contract for goods is completed when the product is delivered and paid for. If you want to end a contract before it is completed where we are not at fault and you are not a consumer who has changed their mind, just contact us to let us know by writing to us. The contract will end immediately and we will refund any sums paid by you for products not provided but we may deduct from that refund (or, if you have not made an advance payment, charge you) reasonable compensation for the net costs we will incur as a result of your ending the contract.</Text>
                    <Text style={styles.head}>OPTIONAL TOOLS</Text>
                    <Text style={styles.para}>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.</Text>
                    <Text style={styles.para}>You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.</Text>
                    <Text style={styles.para}>Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).</Text>
                    <Text style={styles.para}>We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.</Text>
                    <Text style={styles.head}>THIRD-PARTY LINKS</Text>
                    <Text style={styles.para}>Certain content, products and services available via our Service may include materials from third-parties.</Text>
                    <Text style={styles.para}>Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.</Text>
                    <Text style={styles.para}>We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party’s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.</Text>
                    <Text style={styles.head}>USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</Text>
                    <Text style={styles.para}>If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, ‘comments’), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.</Text>
                    <Text style={styles.para}>We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libellous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.</Text>
                    <Text style={styles.para}>You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libellous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.</Text>
                    <Text style={styles.head}>PERSONAL INFORMATION</Text>
                    <Text style={styles.para}>Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.</Text>
                    <Text style={styles.head}>ERRORS, INACCURACIES AND OMISSIONS</Text>
                    <Text style={styles.para}>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).</Text>
                    <Text style={styles.para}>We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.</Text>
                    <Text style={styles.head}>PROHIBITED USES</Text>
                    <Text style={styles.para}>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</Text>
                    <Text style={styles.head}>DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</Text>
                    <Text style={styles.para}>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.</Text>
                    <Text style={styles.para}>We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</Text>
                    <Text style={styles.para}>You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.</Text>
                    <Text style={styles.para}>You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided ‘as is’ and ‘as available’ for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.</Text>
                    <Text style={styles.para}>In no case shall VEVIBES LTD, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.</Text>
                    <Text style={styles.head}>INDEMNIFICATION</Text>
                    <Text style={styles.para}>You agree to indemnify, defend and hold harmless VEVIBES LTD and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</Text>
                    <Text style={styles.head}>SEVERABILITY</Text>
                    <Text style={styles.para}>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</Text>
                    <Text style={styles.head}>TERMINATION</Text>
                    <Text style={styles.para}>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.</Text>
                    <Text style={styles.para}>These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.</Text>
                    <Text style={styles.para}>To terminate with us, please let us know by doing one of the following:</Text>
                    <View style={[styles.flexBox,{alignItems:"flex-start"}]}>
                        <Text style={[styles.para,{color: COLORS.secondary}]}>Email: </Text>
                        <Text style={styles.para}>The best way to contact us is via email at info@vevibes.com. Please provide your name, home address, details of the order and, where available, your phone number and email address.</Text>
                    </View>
                    <View style={[styles.flexBox,{alignItems:"flex-start"}]}>
                        <Text style={[styles.para,{color: COLORS.secondary}]}>Phone: </Text>
                        <Text style={styles.para}>Call customer services on 0333 050 2684.</Text>
                    </View>
                    <View style={[styles.flexBox,{alignItems:"flex-start"}]}>
                        <Text style={[styles.para,{color: COLORS.secondary}]}>Online: </Text>
                        <Text style={styles.para}>Complete the form here</Text>
                    </View>
                    <Text style={styles.para}>If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).</Text>
                    <Text style={styles.head}>ENTIRE AGREEMENT</Text>
                    <Text style={styles.para}>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</Text>
                    <Text style={styles.para}>These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</Text>
                    <Text style={styles.para}>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</Text>
                    <Text style={styles.head}>GOVERNING LAW</Text>
                    <Text style={styles.para}>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of 197, COOKSEY LANE, BIRMINGHAM, B44 9QX, United Kingdom.</Text>
                    <Text style={styles.head}>CHANGES TO TERMS OF SERVICE</Text>
                    <Text style={styles.para}>You can review the most current version of the Terms of Service at any time at this page.</Text>
                    <Text style={styles.para}>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</Text>
                    <Text style={styles.head}>CONTACT INFORMATION</Text>
                    <Text style={styles.para}>We are VEVIBES LTD a company registered in England and Wales. Our company registration number is 11521510.</Text>
                    <Text style={styles.para}>You can contact us by telephoning our customer service team at 0333 050 2684 or by writing to us at info@vevibes.com.</Text>
                    <Text style={styles.para}>If we have to contact you we will do so by telephone or by writing to you at the email address or postal address you provided to us in your order.</Text>
                    <Text>
                        <Text style={[styles.para,{color:COLORS.green}]}>“Writing” includes emails.</Text>
                        <Text style={styles.para}> When we use the words “writing” or “written” in these terms, this includes emails.</Text>
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    head: {
        ...FONTS.h4,
        color: COLORS.primary,
        marginBottom: 15,
        textTransform:"capitalize"
    },
    para: {
        color: COLORS.gray,
        ...FONTS.body3,
        marginBottom: 10
    },
    flexBox: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    circle: {
        ...FONTS.body4,
        color: COLORS.primary,
        marginTop: 1,
        marginRight:5
    }
})
