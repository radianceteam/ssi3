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

## DID syntax

The DID scheme is a URI scheme conforming to RFC3986.

DIDURI consists of 3 parts:
 1) URI scheme("did:")
 2) Identifier for the DID method("everscale:")
 3) Unique DID method of a specific identifier


Our Everscale DID method meets the requirements set out in section 8.1 of did-core. DID that use our method should start with the prefix: did:everscale. The rest after the prefix is the identifier of a specific method, which is represented as the pubkey of the Everscale contract, which belongs to the DID subject of which describes the DID document stored under this DID.

Example: did:everscale:28f5254ada3193904d65d0ab4d60a05d8ae51f03a2d4cf7d4352030996188580

