# Documentation on Radiacne Team DID

## Key terms

**Decentralized identifier (DID)** – A globally unique persistent identifier that does not require a centralized registration authority and is often generated and/or registered cryptographically.

**DID controller** – An entity that has the capability to make changes to a DID document. A DID might have more than one DID controller.

**DID document** – Набор данных, описывающих субъект DID, включая такие механизмы как криптографические открытые ключи, которые можно использовать для аутентификации себя и подтверждения своей связи с DID.

**DID method** – Метод DID определяется спецификацией метода DID, которая указывает точные операции, с помощью которых создаются, разрешаются, обновляются и деактивируются DID и DID document.

**DID subject** – Объект, идентифицируемый DID и описываемый DID document. DID subject может быть что угодно: человек, группа, организация, физическая вещь, цифровая вещь, логическая вещь и т.д. 

**verifiable data registry** – Система, упрощающая создание, проверку, обновление и/или деактивацию DID и DID document.

## Annotation

Децентрализованные идентификаторы – это новый тип идентификаторов, которые используют криптографию для подтверждения данных без третьих сторон.  DID были разработаны таким образом что их можно было отделить от централизованных реестров, поставщиков удостоверений и центров сертификации. Каждый DID связан с DID document который в свою очередь описывает DID subject которому принадлежит DID.  

Наша система использует метод DID представленный в виде смарт-контрактов Everscale которые хранят информацию, которая представлена в виде DID document. Имя метода DID - «everscale». 


## DID syntax

Схема DID представляет собой схему URI, соответствующую RFC3986.

DID URI состоит из 3 частей: 
1)	Схема URI(«did:»)
2)	Идентификатор для метода DID(«everscale:»)
3)	Уникальный метод DID конкретного идентификатора

Наш метод Everscale DID соответствует требованиям, изложенным в разделе 8.1 did-core. DID которые используют наш метод должен начинаться с префикса: did:everscale. Остальная часть после префикса представляет собой идентификатор конкретного метода, который представлен в виде pubkey контракта Everscale, который принадлежит DID subject которого описывает DID document хранящийся под этим DID.


**Example**: did:everscale:28f5254ada3193904d65d0ab4d60a05d8ae51f03a2d4cf7d4352030996188580


## The general scheme of relations


## Операции CRUD

Смарт-контракт DIDStorage служит интерфейсом для создания DID и поиска DID document по pubkey. Все действия по чтению, изменению и деактивации DID происходят в смарт-контракте DIDDocument, который создается для каждого DID и DIDDocument.

Спецификацию всех функций контракта можно найти здесь: [src/docs/specification.md](./specification.md)






