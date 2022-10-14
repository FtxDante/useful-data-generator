const SubscribedProductsRepository = require('../repositories/SubscribedProductsRepository');
const UserProfileRepository = require('../repositories/UserProfileRepository');
const CustomerProvisioningRepository = require('../repositories/CustomerProvisioningRepository');
const GenerateTokenRepository = require('../repositories/GenerateTokenRepository');
const BadRequest = require('../errors/BadRequest');

class GeneratorService {
  constructor() {
    this.subscribedProductsRepository = new SubscribedProductsRepository();
    this.userProfileRepository = new UserProfileRepository();
    this.customerProvisioningRepository = new CustomerProvisioningRepository();
    this.generateTokenRepository = new GenerateTokenRepository();
  }

  async getProcessLoginBody(cpf, password, token = undefined) {
    try {
      const { entryUUID } = (await this.customerProvisioningRepository.getCustomerProvisioning(cpf))[0];
      const userProfile = await this.userProfileRepository.getUserProfile(entryUUID);
      const subscribedProducts = (await this.subscribedProductsRepository.getSubscribedProducts(entryUUID))[0];
      const token_decoded = !token ? (await this.generateTokenRepository.getToken4P(cpf, password)).token_decoded : token;

      const { id: lineNumber } = userProfile.identities.find((identitie) => identitie.type === 'phone_number');
      return {
        userId: cpf,
        document: cpf,
        uuid: entryUUID,
        productId: subscribedProducts.id,
        oauthToken: token_decoded,
        typeLine: 'F',
        lineNumber,
        tags: subscribedProducts.tags,
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = GeneratorService;
