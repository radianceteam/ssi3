# Documentation on Radiacne Team DID

## Key terms

**Decentralized identifier (DID)** – A globally unique persistent identifier that does not require a centralized registration authority and is often generated and/or registered cryptographically.

**DID controller** – An entity that has the capability to make changes to a DID document. A DID might have more than one DID controller.

**DID document** – A set of data describing the subject of the DID, including mechanisms such as cryptographic public keys that can be used to authenticate yourself and confirm your connection with the DID.

**DID method** – The DID method is defined by the DID method specification, which specifies the exact operations by which DID and DID document are created, resolved, updated, and deactivated.

**DID subject** – An object identified by DID and described by DID document. DID subject can be anything: a person, a group, an organization, a physical thing, a digital thing, a logical thing, etc.

**verifiable data registry** – A system that simplifies the creation, verification, updating and/or deactivation of DID and DID document.

## Annotation

Decentralized identifiers are a new type of identifiers that use cryptography to verify data without third parties.  DID were designed in such a way that they could be separated from centralized registries, identity providers, and certification authorities. Each DID is associated with a DID document which in turn describes the DID subject to which the DID belongs.  

Our system uses the DID method presented in the form of Everscale smart contracts that store information that is presented in the form of a DID document. The name of the DID method is "everscale".
